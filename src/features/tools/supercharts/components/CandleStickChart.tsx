import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { rawData } from './data';

function calculateMA(dayCount: number, data: number[][]): (number | string)[] {
  const result: (number | string)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}

export const CandlestickChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const dates = rawData.map(item => item[0]);
    const data = rawData.map(item => [
      +item[1], // open
      +item[2], // close
      +item[5], // low
      +item[6], // high
    ]);

    const option: echarts.EChartsOption = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: dates },
      yAxis: { scale: true },
      series: [
        {
          type: 'candlestick',
          name: 'Day',
          data,
          itemStyle: {
            color: '#26a69a',
            color0: '#ef5350',
            borderColor: '#26a69a',
            borderColor0: '#ef5350',
          },
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5, data),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 1 },
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: 500 }} />;
};
