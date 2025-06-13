'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { simulateData, getDateRange } from './chartUtils';
import type { DataPoint } from './chartUtils';

import { ChartWrapper } from './ChartWrapper';
import { ZoomControls } from './ZoomControls';

export type TimeFrame = '1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y';

export function ZoomableChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [data, setData] = useState<DataPoint[]>([]);
  const [originalData, setOriginalData] = useState<DataPoint[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  useEffect(() => {
    const [start, end] = getDateRange(timeframe);
    const newData = simulateData(start, end);
    setData(newData);
    setOriginalData(newData);
    setStartTime(null);
    setEndTime(null);
  }, [timeframe]);

  return (
    <Card className="w-full h-[800px] bg-transparent">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg">LESS Supercharts 0.1</CardTitle>
        <ZoomControls timeframe={timeframe} onTimeframeChange={setTimeframe} onReset={() => { setStartTime(null); setEndTime(null); }} />
      </CardHeader>
      <CardContent className="p-4 h-full">
        <ChartWrapper
          data={data}
          originalData={originalData}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      </CardContent>
    </Card>
  );
}