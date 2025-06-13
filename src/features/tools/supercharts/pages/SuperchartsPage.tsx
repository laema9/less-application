'use client';

import { ZoomableChart } from '../components/ZoomableChart';

export default function SuperchartsPage() {
  return (
    <main className="flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-screen-2xl h-[800px]">
        
        <ZoomableChart />
      </div>
    </main>
  );
}
