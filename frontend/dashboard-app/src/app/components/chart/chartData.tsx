'use client';

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

interface Props{
  sensorData: number;
  sensorName: string;
  format: string;
}

const ChartData: React.FC<Props> = ({ sensorData, sensorName, format }) => {
  const [options, setOptions] = useState({});
  const [sensorminValue, setSensorminValue] = useState<number>(sensorData);

  const minSensorValue = () => {
    sensorData < sensorminValue &&
      setSensorminValue(sensorData);
    // console.log('setSensorminValue:', sensorminValue);
  };

  useEffect(() => {
    const chartOptions = {
      // title: {
      //   text: 'My garden data',
      // },
      tooltip: {
        trigger: 'axis',
      },

      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {},
        },
      },
      grid: { top: 40, right: 40, bottom: 40, left: 40 },
      xAxis: {
        boundaryGap: false,
        type: 'category',
        data: sensorName,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: format,
        },
      },
      series: [
        {
          data: sensorData,
          name: sensorName,
          type: 'line',
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }],
          },
        },
        {
          name: 'Lowest',
          type: 'line',
          data: sensorminValue,
          markPoint: {
            data: [{ name: sensorName, value: -2, xAxis: 1, yAxis: -1.5 }],
          },
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
              [
                {
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max',
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max',
                  },
                  type: 'max',
                  name: sensorName,
                },
              ],
            ],
          },
        },
      ],
    };
    setOptions(chartOptions);
  }, [sensorData, sensorminValue]);

  return (
    <>
      {minSensorValue()}
      <ReactEcharts
        option={options}
        style={{ width: '600px', height: '300px' }}
      />
    </>
  );
};

export default ChartData;
