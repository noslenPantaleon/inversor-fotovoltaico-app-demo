'use client';

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

interface sensorProps {
  sensorData: object;
}

const ChartLine = ({ sensorData }: sensorProps) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'temperature',
          type: 'line',
          showSymbol: true,
          data: sensorData,
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

export default ChartLine;
