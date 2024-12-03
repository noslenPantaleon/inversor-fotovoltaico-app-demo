'use client';
import { useInverters } from '@/app/hooks/useInverters';
import React from 'react';

import { Inverter } from '@/app/types/inverter';
import SensorCard from '@/app/components/sensorcard/SensorCard';

export const Inverters = () => {
  const { data, isLoading } = useInverters();
  console.log(data);

  return (
    <section>
      {isLoading && <p>loading...</p>}

      <h1>Dashboard</h1>

      {data.map((data: Inverter) => {
        return (
          <div key={data.name}>
            <SensorCard
              growroon={data.id}
              sensorName={data.name}
              sensor={data.current}
            />
          </div>
        );
      })}
    </section>
  );
};
