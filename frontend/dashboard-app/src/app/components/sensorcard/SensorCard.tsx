'use client';
import { FC } from 'react';
import styles from './sensorCard.module.css';
import { formatDate } from '../../utils/formatDate';

interface SensorDataProps {
  inverterId: number;
  inverterName: string;
  sensorName: string;
  sensor: number;
  icon?: JSX.Element;
  date?: Date;
  onUpdate: (inverterId: number) => void;
}

const SensorCard: FC<SensorDataProps> = ({
  inverterId,
  inverterName,
  sensorName,
  sensor,
  icon,
  date,
  onUpdate,
}) => {
  const handleUpdateClick = () => {
    onUpdate(inverterId);
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          {icon}
          <h4>{sensorName}</h4>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.inverterName}>
            <p>
              Inverter: <span>{inverterName}</span>
            </p>
          </div>

          {sensorName === 'Temperature' && <h1>{sensor + '°C'}</h1>}
          {sensorName === 'Voltage' && <h1>{sensor + 'v'}</h1>}
          {sensorName === 'Current' && <h1>{sensor + 'A'}</h1>}

          <button onClick={handleUpdateClick}>Update</button>
          <div className={styles.date}>
            <p>
              Last Update:
              <span> {date && formatDate(date, 'dd MMMM - yyyy')}</span>
              {/* <span> {date && new Date(date).toLocaleString()}</span> */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SensorCard;
