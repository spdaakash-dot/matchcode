import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MatchCode API is running' });
});

// Get all standard materials
app.get('/api/standard-materials', async (req, res) => {
  try {
    const materials = await prisma.standardMaterial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(materials);
  } catch (error) {
    console.error('Error fetching standard materials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all materials
app.get('/api/materials', async (req, res) => {
  try {
    const materials = await prisma.material.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all audit logs
app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { timestamp: 'desc' }
    });
    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
