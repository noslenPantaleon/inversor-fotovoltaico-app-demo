import { prisma } from '../database/prisma';
import { faker } from '@faker-js/faker';

export async function seedDatabase() {
  const connections = [];

  // Create random connections
  for (let i = 0; i < 5; i++) {
    const connection = await prisma.connection.create({
      data: {
        name: faker.company.name(),
      },
    });
    connections.push(connection.id);
  }

  // Create random inverters for each connection
  for (const connectionId of connections) {
    for (let j = 0; j < 3; j++) {
      await prisma.inverter.create({
        data: {
          name: faker.word.noun(),
          temperature: parseFloat(faker.number.float({ min: 20, max: 100 }).toFixed(2)),
          voltage: parseFloat(faker.number.float({ min: 110, max: 240 }).toFixed(2)),
          current: parseFloat(faker.number.float({ min: 5, max: 30 }).toFixed(2)),
          connectionId,
        },
      });
    }
  }
}
