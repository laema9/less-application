// components/ZoomableChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { simulateData, getDateRange } from './chartUtils';
import type { DataPoint } from './chartUtils';
import { ChartWrapper } from './ChartWrapper';
import { ZoomControls } from './ZoomControls';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog';
import { SymbolModalContent } from './SymbolModal';

export type TimeFrame = '1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y';

const symbolOptions = [
  { value: 'btcusd', label: 'BTC/USD' },
  { value: 'solusd', label: 'SOL/USD' },
  { value: 'hypeusd', label: 'HYPE/USD' },
  { value: 'ethusd', label: 'ETH/USD' },
  { value: 'gogousd', label: 'GOGO/USD' },
];

export function ZoomableChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [data, setData] = useState<DataPoint[]>([]);
  const [originalData, setOriginalData] = useState<DataPoint[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>('btcusd');

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
        <Dialog>
          <DialogTrigger asChild>
            <CardTitle className="text-lg cursor-pointer hover:underline">
              {symbolOptions.find(s => s.value === symbol)?.label || 'Select Symbol'}
            </CardTitle>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Symbol change</DialogTitle>
            </DialogHeader>
            <SymbolModalContent value={symbol} onChange={setSymbol} />
            <DialogFooter />
          </DialogContent>
        </Dialog>
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
