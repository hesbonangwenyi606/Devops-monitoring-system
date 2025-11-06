const express = require('express');
const prisma = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth(), async (req, res) => {
  const nodes = await prisma.node.findMany({ include: { alerts: true } });
  res.json(nodes);
});

router.post('/', auth('admin'), async (req, res) => {
  const { name, ip } = req.body;
  const node = await prisma.node.create({ data: { name, ip } });
  res.json(node);
});

module.exports = router;
