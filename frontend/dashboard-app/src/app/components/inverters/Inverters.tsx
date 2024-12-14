'use client';
import { useInverters } from '@/app/hooks/useInverters';
import React, { useState } from 'react';
import styles from './inverters.module.css';
import { Inverter } from '@/app/types/inverter';
import SensorCard from '@/app/components/sensorcard/SensorCard';
import { GrActions } from 'react-icons/gr';
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md';
import { CiTempHigh } from 'react-icons/ci';
import ChartSensors from '../chart/chartSensors';
import ChartTempGauge from '../chart/chartTempGauge';
import ChartData from '../chart/chartData';
export const Inverters = () => {
  const { data, isLoading } = useInverters();

  const [searchName, setSearchName] = useState('');
  const [filteredInverters, setFilteredInverters] = useState(data);
  console.log(data);

  const handleFilter = () => {
    const filtered = data.filter(
      (inverter: Inverter) =>
        inverter.name.toLowerCase().includes(searchName.toLowerCase()) &&
        inverter.connectionId == 1
    );
    setFilteredInverters(filtered);
  };

  return (
    <section className={styles.container}>
      {isLoading && <p>loading...</p>}
      <h1>Inverter Filter</h1>
      <input
        type='text'
        placeholder='Search by name'
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <button onClick={handleFilter}>Filter</button>
      {filteredInverters.length > 0 ? (
        <ul>
          {filteredInverters.map((inverter: Inverter) => (
            <li key={inverter.id}>
              <strong>+ {inverter.name}</strong> Temperature:{' '}
              {inverter.temperature}, Voltage: {inverter.voltage}, Current:{' '}
              {inverter.current}, Connection ID: {inverter.connectionId}
            </li>
          ))}
        </ul>
      ) : (
        <p>No inverters found with that name.</p>
      )}

      {data.map((data: Inverter) => {
        return (
          <article key={data.id}>
              <h1>
                Inverter: <span> {data.name}</span>{' '}
              </h1>
            <div className={styles.cards}>
              <SensorCard
                inverterName={data.name}
                sensorName={'Temperature'}
                sensor={data.temperature}
                icon={<CiTempHigh size={30} color='white' />}
                date={data.createdAt}
              />
              <SensorCard
                inverterName={data.name}
                sensorName={'Current'}
                sensor={data.current}
                icon={<MdOutlineEnergySavingsLeaf size={30} color='white' />}
                date={data.createdAt}
              />
              <SensorCard
                inverterName={data.name}
                sensorName={'Voltage'}
                sensor={data.voltage}
                icon={<GrActions size={30} color='white' />}
                date={data.createdAt}
              />
            </div>
            <ChartSensors
                sensorData={[
                  data.temperature,
                  data.current,
                  data.voltage,
                  data.createdAt,
                ]}
              />
            <ChartTempGauge
                sensorData={[data.temperature]}
                format='{value} °C'
              />

              <ChartData
                sensorData={data.temperature}
                sensorName='Temperature'
                format='{value} °C'
              />
          </article>
        );
      })}

      
    </section>
  );
};
