import { prisma } from '../database/prisma';
import { faker } from '@faker-js/faker';

export async function seedDatabase() {
  const totalClients = 3; // Number of clients (connections)
  const recordsPerInverter = 10; // Number of records per inverter for each client

  // Step 1: Create Clients (Connections)
  const clients = [];
  for (let i = 0; i < totalClients; i++) {
    const client = await prisma.connection.create({
      data: {
        name: faker.company.name(), // Random client name
      },
    });
    clients.push(client.id);
  }

  // Step 2: For Each Client, Create One Unique Inverter with Multiple Records
  for (const clientId of clients) {
    const inverterName = `inverter-${clientId}`; // Unique inverter name per client

    console.log(`Seeding data for Client ID: ${clientId}, Inverter Name: ${inverterName}`);

    // Create multiple records for the single inverter
    for (let i = 0; i < recordsPerInverter; i++) {
      await prisma.inverter.create({
        data: {
          name: inverterName, // Same inverter name for the client
          temperature: faker.number.float({ min: -5, max: 50, fractionDigits: 2 }),
          voltage: faker.number.float({ min: 180, max: 230, fractionDigits: 2 }),
          current: faker.number.float({ min: 3, max: 70, fractionDigits: 2 }),
          connectionId: clientId, // Link to the current client
        },
      });
    }

    console.log(`Seeded ${recordsPerInverter} records for Client ID: ${clientId}`);
  }
}

// seedDatabase()
//   .then(() => {
//     console.log('Database seeded successfully with one inverter per client and multiple records!');
//   })
//   .catch(e => {
//     console.error('Error seeding database:', e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
