import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Button } from "@/shared/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const symbols = [
  { value: "btcusd", label: "BTC/USD" },
  { value: "solusd", label: "SOL/USD" },
  { value: "hypeusd", label: "HYPE/USD" },
  { value: "ethusd", label: "ETH/USD" },
  { value: "gogousd", label: "GOGO/USD" },
];

export function SymbolModalContent({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          {value ? symbols.find((s) => s.value === value)?.label : "Select symbol..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search symbol..." className="h-9" />
          <CommandList>
            <CommandEmpty>No symbol found.</CommandEmpty>
            <CommandGroup>
              {symbols.map((symbol) => (
                <CommandItem
                  key={symbol.value}
                  value={symbol.value}
                  onSelect={() => {
                    onChange(symbol.value);
                    setOpen(false);
                  }}
                >
                  {symbol.label}
                  <Check className={cn("ml-auto", value === symbol.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
