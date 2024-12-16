'use client';

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

interface sensorProps {
  sensorData: object;
}

const ChartStacked = ({ sensorData }: sensorProps) => {
  const [options, setOptions] = useState({});
  const sensors = Object.values(sensorData);
  console.log('sensors chart:', sensors);

  useEffect(() => {
    const chartOptions = {
      title: {
        text: 'Historical',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Temperature', 'current', 'voltage'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Temperature', 'current', 'voltage'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          stack: 'Total',
          data: sensors[0],
        },
        {
          name: 'current',
          type: 'line',
          stack: 'Total',
          data: sensors[1],
        },

        {
          name: 'voltage',
          type: 'line',
          stack: 'Total',
          data: sensors[2],
        },
      ],
    };
    setOptions(chartOptions);
    console.log(typeof sensorData);
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

export default ChartStacked;
