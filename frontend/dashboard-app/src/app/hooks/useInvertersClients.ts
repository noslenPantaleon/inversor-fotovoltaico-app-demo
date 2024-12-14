'use client';
import { useQuery } from '@tanstack/react-query';

import { getInvertersClients } from '../services/getInvertersClients';

export const useInvertersClients = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: getInvertersClients,
  });

  return { data, error, isLoading, refetch };
};
