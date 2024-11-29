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
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required.' });
  }

  try {
    const inverters = await prisma.inverter.findMany({
      where: {
        name: String(name),
      },
    });

    // const inverters = await prisma.inverter.findMany({
    //   where: {
    //     name: {
    //       contains: String(name), // Use case-insensitive contains for flexibility
    //     },
    //   },
    // });

    // const inverters = await prisma.inverter.findMany({
    //   where: {
    //     name: {
    //       contains: String(name), // This enables partial matching for the name
    //       mode: 'insensitive', // Case-insensitive matching
    //     },
    //   },
    //   include: {
    //     connection: true, // This will also include the related Connection data if needed
    //   },
    // });

    if (inverters.length === 0) {
      return res.status(404).json({ message: 'No inverters found with the given name.' });
    }

    return res.json(inverters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving inverters.' });
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
