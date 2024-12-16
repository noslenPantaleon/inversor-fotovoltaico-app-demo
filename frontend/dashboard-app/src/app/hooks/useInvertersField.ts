import { useQuery } from '@tanstack/react-query';
import { getInvertersField } from '../services/getInverters';

// Custom hook to fetch a specific inverter field
export const useInvertersField = (inverterId: number, field: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['inverterfield', inverterId, field],
    queryFn: () => getInvertersField(inverterId, field),
    enabled: !!inverterId && !!field,
  });

  return { dataField: data, error, isLoading, refetch };
};
