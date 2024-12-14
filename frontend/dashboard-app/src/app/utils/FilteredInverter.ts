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
    .filter((company) => company.inverters.length > 0); // Only include companies with matching inverters
};

export const filterLastInverterRecord = (
  data: clients[],
  inverterId: number
): Inverter | null => {
  const allInverters = data
    .flatMap((company) => company.inverters)
    .filter((inverter) => inverter.id === inverterId);

  if (allInverters.length === 0) return null;

  // Sort by `createdAt` descending and return the first record
  return allInverters.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
};
