'use client';

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';
// import { Inverter } from '@/app/types/inverter';

interface sensorProps {
  sensorData: object;
}

const ChartSensors = ({ sensorData }: sensorProps) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const chartOptions = {
      xAxis: {
        type: 'category',
        data: ['temp', 'current', 'Voltage'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: sensorData,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: '#4AA541',
          },
        },
      ],
    };

    setOptions(chartOptions);
  }, [sensorData]);

  return (
    <>
      <ReactEcharts
        option={options}
        style={{ width: '600px', height: '300px' }}
      />
    </>
  );
};

export default ChartSensors;
