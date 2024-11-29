import { Router } from 'express';
import { prisma } from '../database/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const connections = await prisma.connection.findMany({ include: { inverters: true } });
  res.json(connections);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const connection = await prisma.connection.create({ data: { name } });
  res.json(connection);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const connection = await prisma.connection.update({ where: { id: Number(id) }, data: { name } });
  res.json(connection);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.connection.delete({ where: { id: Number(id) } });
  res.json({ message: 'Connection deleted' });
});

export default router;
