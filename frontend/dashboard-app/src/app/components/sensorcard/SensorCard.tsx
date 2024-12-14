'use client';
import { FC } from 'react';

import styles from './sensorCard.module.css';
import { formatDate } from '../../utils/formatDate';

interface SensorDataProps {
  inverterName: string;
  sensorName: string;
  sensor: number;
  icon?: JSX.Element;
  date?: Date;
}

const SensorCard: FC<SensorDataProps> = ({
  inverterName,
  sensorName,
  sensor,
  icon,
  date,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          {icon}
          <h4> {sensorName}</h4>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.inverterName}>
            <p>
              Inverter: <span>{inverterName}</span>
            </p>
          </div>

          {sensorName === 'Temperature' && <h1>{sensor + '°C'}</h1>}
          {sensorName === 'Voltage' && <h1>{sensor + 'v'}</h1>}
          {sensorName === 'Current' && <h1>{sensor + 'a'}</h1>}

          <button>Update</button>
          <div className={styles.date}>
            <p>
              Last Update:
              <span> {date && formatDate(date, 'dd MMMM - yyyy')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorCard;
