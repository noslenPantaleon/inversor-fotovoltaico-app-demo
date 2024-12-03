import { Router } from 'express';
import { prisma } from '../database/prisma';
import { Request, Response } from 'express';

const router = Router();

router.get('/list', async (req, res) => {
  const inverters = await prisma.inverter.findMany();
  res.json(inverters);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const inverters = await prisma.inverter.findMany({ where: { connectionId: Number(id) } });
  res.json(inverters);
});
router.get('/filter', async (req: any, res: any) => {
  const { name, connectionId } = req.query;

  try {
    // Build the query conditions dynamically
    const filters: any = {}; // Use `any` to allow dynamic properties
    if (name) {
      filters.name = {
        contains: String(name), // Enables partial matching
        mode: 'insensitive', // Case-insensitive matching
      };
    }

    if (connectionId) {
      filters.connection = {
        name: {
          contains: String(connectionId), // Enables partial matching
          mode: 'insensitive', // Case-insensitive matching
        },
      };
    }

    const inverters = await prisma.inverter.findMany({
      where: filters,
      include: {
        connection: true, // Include connection details in the response
      },
    });

    if (inverters.length === 0) {
      return res.status(404).json({ message: 'No inverters found with the specified filters.' });
    }

    return res.json(inverters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the inverters.' });
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
