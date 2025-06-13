import React from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

type Interval =
  | '1'
  | '3'
  | '5'
  | '15'
  | '30'
  | '60'
  | '120'
  | '180'
  | '240'
  | 'D'
  | 'W';

interface AdvancedChartWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  interval?: Interval;
  width?: string | number;
  height?: string | number;
}

const AdvancedChartWidget: React.FC<AdvancedChartWidgetProps> = ({
  symbol = 'NASDAQ:AAPL',
  theme = 'dark',
  interval = '60',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div style={{ width, height }}>
      <AdvancedRealTimeChart
        symbol={symbol}
        theme={theme}
        interval={interval}
        autosize
      />
    </div>
  );
};

export default AdvancedChartWidget;
