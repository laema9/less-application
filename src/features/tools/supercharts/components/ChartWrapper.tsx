import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceArea,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo, useRef, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/shared/ui/chart';
import { chartConfig, formatXAxis } from './chartUtils';

type DataPoint = {
  date: string;
  events: number;
};

type ChartWrapperProps = {
  data: DataPoint[];
  originalData: DataPoint[];
  startTime: string | null;
  endTime: string | null;
  setStartTime: (s: string) => void;
  setEndTime: (s: string) => void;
};

export function ChartWrapper({ data, originalData, startTime, endTime, setStartTime, setEndTime }: ChartWrapperProps) {
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [cursorDate, setCursorDate] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const zoomedData = useMemo(() => {
    if (!startTime || !endTime) return data;
    const rangeData = originalData.filter(d => d.date >= startTime && d.date <= endTime);
    return rangeData.length > 1 ? rangeData : originalData.slice(0, 2);
  }, [startTime, endTime, originalData, data]);

  const handleMouseDown = (e: any) => {
    if (e.activeLabel) {
      setRefAreaLeft(e.activeLabel);
      setIsSelecting(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (e.activeLabel) setCursorDate(e.activeLabel);
    if (isSelecting && e.activeLabel) setRefAreaRight(e.activeLabel);
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

  const handlePan = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!startTime || !endTime || isSelecting || e.buttons !== 1) return;
    const range = new Date(endTime).getTime() - new Date(startTime).getTime();
    const shift = (range * e.movementX) / (chartRef.current?.offsetWidth || 1);

    const newStart = new Date(new Date(startTime).getTime() - shift).toISOString();
    const newEnd = new Date(new Date(endTime).getTime() - shift).toISOString();

    setStartTime(newStart);
    setEndTime(newEnd);
  };

  const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!startTime || !endTime) return;
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

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <div ref={chartRef} onWheel={handleZoom} onMouseMove={handlePan} className="h-full cursor-crosshair">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={zoomedData}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { handleMouseUp(); setCursorDate(null); }}
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
              cursor={{ strokeDasharray: '3 3' }}
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
            {cursorDate && (
              <ReferenceArea
                x1={cursorDate}
                x2={cursorDate}
                stroke="hsl(var(--foreground))"
                strokeOpacity={0.2}
              />
            )}
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
  );
}