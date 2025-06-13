import type { ChartConfig } from '@/shared/ui/chart';

export type DataPoint = {
  date: string;
  events: number;
};

export const chartConfig = {
  events: {
    label: 'Events',
    color: '#4f46e5',
  },
} satisfies ChartConfig;

export const seedRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export function getDateRange(timeframe: string): [string, string] {
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
  const simulatedData: DataPoint[] = [];
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

export function formatXAxis(tick: string) {
  return new Date(tick).toLocaleDateString();
}
