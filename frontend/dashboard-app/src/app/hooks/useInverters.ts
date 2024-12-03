'use client';
import { useQuery } from '@tanstack/react-query';

import { getInverters } from '../services/getInverters';

export const useInverters = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['inverter'],
    queryFn: getInverters,
  });

  return { data, error, isLoading, refetch };
};
