'use client';
import React, { useState } from 'react';
import styles from './inverterFilter.module.css';
import { useInvertersClients } from '../../hooks/useInvertersClients';
import {
  filterLastInverterRecord,
  filterByCompanyName,
  filterByInverterName,
} from '../InverterFilter/utils/FilteredInverter';
import { Inverter, clients } from '@/app/types/inverter';
const InverterFilter = () => {
  const { data, isLoading, error, refetch } = useInvertersClients();
  const [companyName, setCompanyName] = useState<string>('');
  const [inverterName, setInverterName] = useState<string>('');
  const [inverterId, setInverterId] = useState<string>('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  let filteredData = data;

  if (companyName) {
    filteredData = filterByCompanyName(filteredData, companyName);
  }
  if (inverterName) {
    filteredData = filterByInverterName(filteredData, inverterName);
    const filteredName = filteredData[0]?.inverters.filter(
      (filter: Inverter) => filter.name == inverterName
    );

    filteredData = filteredName ? filteredName : [];
    console.log(filteredData);
  }
  if (inverterId) {
    const lastRecord = filterLastInverterRecord(filteredData, inverterId);
    filteredData = lastRecord ? [lastRecord] : [];
  }

  // console.log(
  //   'filterByInverterName:',
  //   filteredData[0].inverters
  //     .map((record: clients[]) => record)
  //     .filter((filter: Inverter) => filter.name == inverterName)
  // );

  return (
    <div className={styles.inverterFilterContainer}>
      <div className={styles.filterSection}>
        <div className={styles.filterInput}>
          <input
            id='company-name'
            type='text'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder='Enter company name'
          />
          <label htmlFor='company-name'>Filter by Company Name:</label>
        </div>
        <div className={styles.filterInput}>
          <input
            id='inverter-name'
            type='text'
            value={inverterName}
            onChange={(e) => setInverterName(e.target.value)}
            placeholder='Enter inverter name'
          />
          <label htmlFor='inverter-name'>Filter by Inverter Name:</label>
        </div>
        <div className={styles.filterInput}>
          <input
            id='inverter-id'
            type='text'
            value={inverterId}
            onChange={(e) => setInverterId(e.target.value)}
            placeholder='Enter inverter name'
          />
          <label htmlFor='inverter-id'>Show Last Record for Inverter ID:</label>
        </div>
        <button onClick={() => refetch()}> update data</button>
      </div>

      <div className={styles.resultsGrid}>
        {filteredData.length > 0 ? (
          filteredData.map((company: clients) => (
            <div key={company.id} className={styles.companyCard}>
              <details>
                <summary>
                  <h2>{company.name}</h2>
                </summary>

                <div className={styles.inverterList}>
                  {company.inverters?.map((inverter: Inverter) => (
                    <div key={inverter.id} className={styles.inverterCard}>
                      <p>
                        <strong>Name:</strong> {inverter.name}
                      </p>
                      <p>
                        <strong>Temperature:</strong> {inverter.temperature}°C
                      </p>
                      <p>
                        <strong>Voltage:</strong> {inverter.voltage} V
                      </p>
                      <p>
                        <strong>Current:</strong> {inverter.current} A
                      </p>
                      <p>
                        <strong>Created At:</strong>{' '}
                        {new Date(inverter.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default InverterFilter;
