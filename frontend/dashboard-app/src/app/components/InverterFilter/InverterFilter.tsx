'use client';
import React, { useState } from 'react';
import { useInvertersClients } from '../../hooks/useInvertersClients';
import {
  filterLastInverterRecord,
  filterByCompanyName,
  filterByInverterName,
} from '../../utils/FilteredInverter';
import './InverterFilter.css';
import { Inverter, clients } from '@/app/types/inverter';
const InverterFilter = () => {
  const { data, isLoading, error, refetch } = useInvertersClients();
  const [companyName, setCompanyName] = useState<string>('');
  const [inverterName, setInverterName] = useState<string>('');
  const [inverterId, setInverterId] = useState<number | null>(null);

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
    console.log(filteredName);
    // filteredData = filteredName ? filteredName : [];
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
    <div className='inverter-filter-container'>
      <div className='filter-section'>
        <div className='filter-input'>
          <label htmlFor='company-name'>Filter by Company Name:</label>
          <input
            id='company-name'
            type='text'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder='Enter company name'
          />
        </div>
        <div className='filter-input'>
          <label htmlFor='inverter-name'>Filter by Inverter Name:</label>
          <input
            id='inverter-name'
            type='text'
            value={inverterName}
            onChange={(e) => setInverterName(e.target.value)}
            placeholder='Enter inverter name'
          />
        </div>
        <div className='filter-input'>
          <label htmlFor='inverter-id'>Show Last Record for Inverter ID:</label>
          <input
            id='inverter-id'
            type='number'
            value={inverterId || ''}
            onChange={(e) => setInverterId(Number(e.target.value))}
            placeholder='Enter inverter ID'
          />
        </div>
        <button onClick={() => refetch()}> update data</button>
      </div>

      <div className='results-grid'>
        {filteredData.length > 0 ? (
          filteredData.map((company: clients) => (
            <div key={company.id} className='company-card'>
              <details>
                <summary>
                  {' '}
                  <h2>{company.name}</h2>
                </summary>

                <div className='inverter-list'>
                  {company.inverters.map((inverter: Inverter) => (
                    <div key={inverter.id} className='inverter-card'>
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
