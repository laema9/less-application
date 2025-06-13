'use client';
import AdvancedChartWidget from '../components/TradingviewChart';

export default function SuperchartsPage() {
  return (
      <div className="w-full h-[800px] mt-5">
        <AdvancedChartWidget symbol="BTCUSD" theme="dark" interval="15" />
      </div>
  );
}
