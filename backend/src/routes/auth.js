const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

const router = express.Router();
const secret = process.env.JWT_SECRET || 'dev-secret';

// Register (admin-only in production; here for bootstrapping)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username+password required' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { username, passwordHash: hash, role: role || 'viewer' } });
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'User exists or invalid' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: '12h' });
  res.json({ token });
});

module.exports = router;
