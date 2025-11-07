const express = require('express');
const prisma = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Get all nodes with alerts
 */
router.get('/', auth(), async (req, res) => {
  try {
    const nodes = await prisma.node.findMany({
      include: { alerts: true },
      orderBy: { id: 'asc' },
    });
    res.json(nodes);
  } catch (error) {
    console.error('Error fetching nodes:', error);
    res.status(500).json({ error: 'Failed to fetch nodes' });
  }
});

/**
 * Create a new node
 */
router.post('/', auth('admin'), async (req, res) => {
  const { name, ip, status } = req.body;

  if (!name || !ip) {
    return res.status(400).json({ error: 'Name and IP address are required' });
  }

  try {
    const node = await prisma.node.create({
      data: {
        name,
        ip,
        status: status || 'unknown', // Default to 'unknown' if not provided
      },
    });

    res.status(201).json(node);
  } catch (error) {
    console.error('Error creating node:', error);
    res.status(500).json({ error: 'Failed to create node' });
  }
});

module.exports = router;

