const express = require('express');
const prisma = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth(), async (req, res) => {
  const alerts = await prisma.alert.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(alerts);
});

router.post('/', auth('admin'), async (req, res) => {
  const { nodeId, message, severity } = req.body;
  const alert = await prisma.alert.create({ data: { nodeId, message, severity } });
  res.json(alert);
});

module.exports = router;
