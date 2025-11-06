require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./db');

const authRoutes = require('./routes/auth');
const nodesRoutes = require('./routes/nodes');
const alertsRoutes = require('./routes/alerts');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/nodes', nodesRoutes);
app.use('/api/alerts', alertsRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`Backend listening on ${port}`);
  // Ensure DB connection
  try { await prisma.$connect(); console.log('Connected to Postgres'); } catch (e) { console.error(e); }
});
