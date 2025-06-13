'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/shared/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import type { ChartConfig } from '@/shared/ui/chart';

type DataPoint = {
  date: string;
  events: number;
};

type TimeFrame = '1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y';

const chartConfig = {
  events: {
    label: 'Events',
    color: '#4f46e5',
  },
} satisfies ChartConfig;

const seedRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

function getDateRange(timeframe: TimeFrame): [string, string] {
  const now = new Date();
  const end = now.toISOString();
  const start = new Date(now);

  switch (timeframe) {
    case '1D': start.setDate(now.getDate() - 1); break;
    case '5D': start.setDate(now.getDate() - 5); break;
    case '1M': start.setMonth(now.getMonth() - 1); break;
    case '3M': start.setMonth(now.getMonth() - 3); break;
    case '6M': start.setMonth(now.getMonth() - 6); break;
    case 'YTD': start.setMonth(0); start.setDate(1); break;
    case '1Y': start.setFullYear(now.getFullYear() - 1); break;
  }

  return [start.toISOString(), end];
}

export function simulateData(start: string, end: string): DataPoint[] {
  const simulatedData = [];
  let baseValue = 50;
  for (let currentDate = new Date(start); currentDate <= new Date(end); currentDate.setTime(currentDate.getTime() + 3600000)) {
    const seed = currentDate.getTime();
    baseValue = Math.max(
      (baseValue + 0.5 * (currentDate.getTime() - new Date(start).getTime()) / (new Date(end).getTime() - new Date(start).getTime()) * 100 +
        (seedRandom(seed) - 0.5) * 20 +
        (seedRandom(seed + 1) < 0.1 ? (seedRandom(seed + 2) - 0.5) * 50 : 0) +
        Math.sin(currentDate.getTime() / 3600000) * 10) *
      (1 + (seedRandom(seed + 3) - 0.5) * 0.2),
      1
    );
    simulatedData.push({
      date: currentDate.toISOString(),
      events: Math.max(Math.floor(baseValue), 1),
    });
  }
  return simulatedData;
}

export function ZoomableChart() {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [data, setData] = useState<DataPoint[]>([]);
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<DataPoint[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const [start, end] = getDateRange(timeframe);
    const newData = simulateData(start, end);
    setData(newData);
    setOriginalData(newData);
    setStartTime(null);
    setEndTime(null);
  }, [timeframe]);

  const zoomedData = useMemo(() => {
    if (!startTime || !endTime) return data;
    const dataPointsInRange = originalData.filter(d => d.date >= startTime && d.date <= endTime);
    return dataPointsInRange.length > 1 ? dataPointsInRange : originalData.slice(0, 2);
  }, [startTime, endTime, originalData, data]);

  const handleMouseDown = (e: any) => {
    if (e.activeLabel) {
      setRefAreaLeft(e.activeLabel);
      setIsSelecting(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (isSelecting && e.activeLabel) {
      setRefAreaRight(e.activeLabel);
    }
  };

  const handleMouseUp = () => {
    if (refAreaLeft && refAreaRight) {
      const [start, end] = [refAreaLeft, refAreaRight].sort();
      setStartTime(start);
      setEndTime(end);
    }
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setIsSelecting(false);
  };

  const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!startTime || !endTime || !chartRef.current) return;
    e.preventDefault();

    const zoomFactor = e.deltaY < 0 ? 0.9 : 1.1;
    const range = new Date(endTime).getTime() - new Date(startTime).getTime();
    const center = new Date(startTime).getTime() + range / 2;
    const newRange = range * zoomFactor;

    const newStart = new Date(center - newRange / 2).toISOString();
    const newEnd = new Date(center + newRange / 2).toISOString();

    setStartTime(newStart);
    setEndTime(newEnd);
  };

  const handleReset = () => {
    setStartTime(null);
    setEndTime(null);
  };

  const formatXAxis = (tick: string) => {
    const d = new Date(tick);
    return d.toLocaleDateString();
  };

  return (
    <Card className="w-full h-full bg-transparent">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg">LESS Supercharts 0.1</CardTitle>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={val => setTimeframe(val as TimeFrame)}>
            <SelectTrigger className="w-[100px] text-xs">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y'].map(tf => (
                <SelectItem key={tf} value={tf}>{tf}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleReset}>Reset</Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[400px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <div ref={chartRef} onWheel={handleZoom} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={zoomedData}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.events.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartConfig.events.color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatXAxis}
                  style={{ fontSize: '10px', userSelect: 'none' }}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  minTickGap={16}
                />
                <YAxis
                  style={{ fontSize: '10px', userSelect: 'none' }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className="w-[150px] font-mono text-xs"
                      nameKey="events"
                      labelFormatter={v => new Date(v).toLocaleString()}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="events"
                  stroke={chartConfig.events.color}
                  fillOpacity={1}
                  fill="url(#colorEvents)"
                  isAnimationActive={false}
                />
                {refAreaLeft && refAreaRight && (
                  <ReferenceArea
                    x1={refAreaLeft}
                    x2={refAreaRight}
                    strokeOpacity={0.3}
                    fill="hsl(var(--foreground))"
                    fillOpacity={0.05}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
