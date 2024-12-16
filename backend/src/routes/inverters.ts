import { Router } from 'express';
import { prisma } from '../database/prisma';
import { Request, Response } from 'express';

const router = Router();

router.get('/list', async (req, res) => {
  const inverters = await prisma.inverter.findMany();
  res.json(inverters);
});

router.get('/:name', async (req: any, res: any) => {
  const { name } = req.params;
  const { field } = req.query;

  // Allowed fields for validation
  const allowedFields = ['temperature', 'voltage', 'current'];
  if (!field || !allowedFields.includes(field as string)) {
    return res.status(400).json({
      error: `Invalid 'field' query parameter. Allowed values are: ${allowedFields.join(', ')}`,
    });
  }

  try {
    const inverter = await prisma.inverter.findFirst({
      where: { name: name },
      orderBy: { createdAt: 'desc' }, // Get the most recent record
      select: {
        [field as string]: true, // Dynamically select the requested field
        createdAt: true, // Optional: Return the date for context
        name: true, // Optional: Return the inverter name for context
      },
    });
    if (!inverter) {
      return res.status(404).json({ error: 'Inverter not found' });
    }

    res.json(inverter);
  } catch (error) {
    console.error('Error fetching specific inverter data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, temperature, voltage, current } = req.body;
  const inverter = await prisma.inverter.create({
    data: {
      name,
      temperature,
      voltage,
      current,
      connectionId: Number(id),
    },
  });
  res.json(inverter);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, temperature, voltage, current } = req.body;
  const inverter = await prisma.inverter.update({
    where: { id: Number(id) },
    data: { name, temperature, voltage, current },
  });
  res.json(inverter);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.inverter.delete({ where: { id: Number(id) } });
  res.json({ message: 'Inverter deleted' });
});

export default router;
