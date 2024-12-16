import { clients, Inverter } from '@/app/types/inverter';

export const filterByCompanyName = (
  data: clients[],
  name: string
): clients[] => {
  return data.filter((company) =>
    company.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const filterByInverterName = (
  data: clients[],
  query: string | number
): clients[] => {
  return data
    .map((company) => ({
      ...company,
      inverters: company.inverters.filter((inverter) => {
        if (typeof query === 'string') {
          return inverter.name.toLowerCase().includes(query.toLowerCase());
        }
        return inverter.id === query;
      }),
    }))
    .filter((company) => company.inverters.length > 0);
};

export const filterLastInverterRecord = (
  data: clients[],
  inverterId: string
): Inverter | null => {
  const allInverters = data
    .flatMap((company) => company.inverters)
    .filter((inverter) => inverter?.name === inverterId);

  if (allInverters.length === 0) return null;

  // Sort by `createdAt` descending and return the first record
  return allInverters.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
};

export const getLatestRecords = (data: Inverter[]) => {
  const latestRecords: { [key: string]: Inverter } = {};

  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  sortedData.forEach((inverter) => {
    if (!latestRecords[inverter.name]) {
      latestRecords[inverter.name] = inverter;
    }
  });

  return Object.values(latestRecords);
};
