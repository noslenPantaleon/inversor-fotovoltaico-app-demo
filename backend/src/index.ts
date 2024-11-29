import express, { Express, Request, Response } from 'express';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import inverterRoutes from './routes/inverters';
import connectionRoutes from './routes/connections';
import { seedDatabase } from './utils/seed';
const cors = require('cors');

dotenv.config();

const app: Express = express();

const corsOptions = {
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.use('/inverters', inverterRoutes);
app.use('/connections', connectionRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('inversor solar api');
});

// Seed Endpoint
app.post('/seed', async (req: Request, res: Response) => {
  try {
    await seedDatabase();
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error seeding database' });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
