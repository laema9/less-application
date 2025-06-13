import { Button } from '@/shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import type { TimeFrame } from './ZoomableChart';

type ZoomControlsProps = {
  timeframe: TimeFrame;
  onTimeframeChange: (val: TimeFrame) => void;
  onReset: () => void;
};

export function ZoomControls({ timeframe, onTimeframeChange, onReset }: ZoomControlsProps) {
  return (
    <div className="flex gap-2">
      <Select value={timeframe} onValueChange={val => onTimeframeChange(val as TimeFrame)}>
        <SelectTrigger className="w-[100px] text-xs">
          <SelectValue placeholder="Timeframe" />
        </SelectTrigger>
        <SelectContent>
          {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y'].map(tf => (
            <SelectItem key={tf} value={tf}>{tf}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
