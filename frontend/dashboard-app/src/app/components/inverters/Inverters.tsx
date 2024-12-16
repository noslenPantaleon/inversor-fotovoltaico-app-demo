'use client';
import { useInverters } from '@/app/hooks/useInverters';
import React, { useState, useEffect } from 'react';
import styles from './inverters.module.css';
import { Inverter } from '@/app/types/inverter';
import SensorCard from '@/app/components/sensorcard/SensorCard';
import { GrActions } from 'react-icons/gr';
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md';
import { CiTempHigh } from 'react-icons/ci';
import ChartSensors from '../chart/chartSensors';
import ChartLine from '../chart/ChartLine';
import ChartTempGauge from '../chart/ChartTempGauge';
import InverterFilter from '../InverterFilter/InverterFilter';
import { getLatestRecords } from '../InverterFilter/utils/FilteredInverter';
import { getInvertersField } from '@/app/services/getInverters';
import ChartStacked from '../chart/ChartStacked';

export const Inverters = () => {
  const { data, isLoading } = useInverters();
  const [filteredInverters, setFilteredInverters] = useState<Inverter[]>([]);
  const [selected, setselected] = useState<string>('');

  const inverter142 = data.filter(
    (data: Inverter) => data.name == 'inverter-142'
  );
  const temp1 = inverter142.map((data: Inverter) => data.temperature);
  const current = inverter142.map((data: Inverter) => data.current);
  const voltage = inverter142.map((data: Inverter) => data.voltage);

  useEffect(() => {
    if (data && data.length > 0) {
      const latestData = getLatestRecords(data);
      setFilteredInverters(latestData);
    }
  }, [data]);

  const handleUpdateCard = async (inverterName: string, sensorName: string) => {
    try {
      const updatedField = await getInvertersField(inverterName, sensorName);
      // console.log('after call api:', updatedField);
      setFilteredInverters((prevInverters) =>
        prevInverters.map((inv) => {
          if (inv.name === inverterName) {
            console.log(
              `Updating ${sensorName} for inverter Name ${inverterName}`
            );
            return {
              ...inv,
              [sensorName]: updatedField[sensorName],
            };
          }
          return inv;
        })
      );
    } catch (error) {
      console.error(
        `Error updating ${sensorName} for inverter ${inverterName}:`,
        error
      );
    }
  };

  // const handleSelectedInverter = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = e.target.value;
  //   setselected(selectedValue);
  //   if (selectedValue) {
  //     const filtered = data.filter((inverter: Inverter) =>
  //       inverter.name.toLowerCase().includes(selectedValue.toLowerCase())
  //     );
  //     setFilteredInverters(getLatestRecords(filtered));
  //   } else {
  //     // If no inverter is selected, reset to the original latest data
  //     setFilteredInverters(getLatestRecords(data));
  //   }
  // };
  return (
    <section className={styles.container}>
      {isLoading && <p>Loading...</p>}
      {/* <div>
        <h3>Select an Inverter</h3>
        <select onChange={handleSelectedInverter} value={selected}>
          <option value=''>Please choose one option</option>
          {[...new Set(data?.map((inverter: Inverter) => inverter.name))].map(
            (name, index) => (
              <option value={name as string} key={index}>
                {name as string}
              </option>
            )
          )}
        </select>
      </div> */}
      {filteredInverters.map((filterdata: Inverter) => {
        return (
          <article key={filterdata.id}>
            <div className={styles.titles}>
              <h1>
                Inverter: <span>{filterdata.name}</span>
              </h1>
              <h1>
                id: <span>{filterdata.id}</span>
              </h1>
            </div>

            <div className={styles.cards}>
              <SensorCard
                inverterId={filterdata.id}
                inverterName={filterdata.name}
                sensorName={'Temperature'}
                sensor={filterdata.temperature}
                icon={<CiTempHigh size={30} color='white' />}
                date={filterdata.createdAt}
                onUpdate={() =>
                  handleUpdateCard(filterdata.name, 'temperature')
                }
              />
              <SensorCard
                inverterId={filterdata.id}
                inverterName={filterdata.name}
                sensorName={'Current'}
                sensor={filterdata.current}
                icon={<MdOutlineEnergySavingsLeaf size={30} color='white' />}
                date={filterdata.createdAt}
                onUpdate={() => handleUpdateCard(filterdata.name, 'current')}
              />
              <SensorCard
                inverterId={filterdata.id}
                inverterName={filterdata.name}
                sensorName={'Voltage'}
                sensor={filterdata.voltage}
                icon={<GrActions size={30} color='white' />}
                date={filterdata.createdAt}
                onUpdate={() => handleUpdateCard(filterdata.name, 'voltage')}
              />
            </div>
            <div className={styles.charts}>
              <ChartSensors
                sensorData={[
                  filterdata.temperature,
                  filterdata.current,
                  filterdata.voltage,
                  filterdata.createdAt,
                ]}
              />
              {/* <ChartLine sensorData={[filterdata.temperature]} /> */}

              {filterdata.name === 'inverter-143' && (
                <ChartStacked
                  sensorData={[
                    [5, 5.5, 5, 4, 2],
                    [20, 10, 5, 6],
                    [220, 210, 224, 221],
                  ]}
                />
              )}

              {filterdata.name === 'inverter-142' && (
                <ChartStacked sensorData={[temp1, current, voltage]} />
              )}
            </div>
          </article>
        );
      })}
      <div>
        <InverterFilter />
      </div>
      ;
    </section>
  );
};

{
  /* <ChartTempGauge
sensorData={[filterdata.temperature]}
format='{value} °C'
/> */
}
