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
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            inactiveColor: '#777'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
                color: '#376df4',
                width: 2,
                opacity: 1
            }
            }
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
        },
        grid: {
            bottom: 80
        },
        dataZoom: [
        {
            textStyle: {
            color: '#8392A5'
            },
            handleIcon: 'path://M10.7,...',
            dataBackground: {
            areaStyle: { color: '#8392A5' },
            lineStyle: { opacity: 0.8, color: '#8392A5' }
            },
            brushSelect: true
        },
        {
            type: 'inside',
            xAxisIndex: 0
        },
        {
            type: 'inside',
        }
        ],

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
        {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        }
        },
        {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        }
        },
        {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1
        }
        }
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
