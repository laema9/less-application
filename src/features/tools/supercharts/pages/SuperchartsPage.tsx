'use client';

import LessSupercharts from '../components/less-supercharts/LessSupercharts';
import AdvancedChartWidget from '../components/TradingviewChart';

export default function SuperchartsPage() {
  return (
    <div>
      <div className="w-full h-[800px] mt-5">
        <AdvancedChartWidget symbol="BTCUSD" theme="dark" interval="15" />
      </div>

      <div className='mt-10'>
        <LessSupercharts />
      </div>

    </div>
      
  );
}
