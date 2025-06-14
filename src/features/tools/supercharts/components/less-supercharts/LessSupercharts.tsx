import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { SymbolModalContent } from '../SymbolModal';
import { useState } from 'react';
import { Brush, Camera, ChartArea, CirclePlus, Highlighter, Search, Type } from "lucide-react";
import { Separator } from "@/shared/ui/separator";

const symbolOptions = [
  { value: 'btcusd', label:"BTC/USD"},
  { value: 'ethusd', label:"ETH/USD"},
  { value: 'solusd', label:"SOL/USD"},
  { value: 'hypeusd', label:"HYPE/USD"},
  { value: 'gogousd', label:"GOGO/USD"},
];

export default function LessSupercharts() {
  const [symbol, setSymbol] = useState<string>("btcusd");

  return (
    <div>
      <Card className="w-full rounded-none">
        <CardHeader className="flex justify-between items-center">
          <Dialog>
            <DialogTrigger asChild>
              <CardTitle className="flex items-center gap-4 text-lg cursor-pointer hover:underline">
                <Search />
                {symbolOptions.find(s => s.value === symbol)?.label || 'Select Symbol'}
              </CardTitle>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Symbol change</DialogTitle>
              </DialogHeader>
              <SymbolModalContent value={symbol} onChange={setSymbol} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="p-0"> 
          <Separator />

          <div className="flex m-0 p-0"> 
            
            {/* TOOLBAR */}
            <section className="mt-5 w-[48px] flex flex-col items-center justify-start gap-6 p-0 m-0">
              <ChartArea />
              <Brush />
              <Highlighter />
              <Type />
              <Camera />
              <CirclePlus />
            </section>

            {/* CHART */}
            <div className="mt-5 flex p-5 h-full w-full">
              <img src="placeholder.png" alt="" />
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
