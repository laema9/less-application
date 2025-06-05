"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/shared/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"

import { useTheme } from "@/app/theme-provider"

const themes = [
  { value: "dark", label: "LESS Theme" },
  { value: "dracula", label: "Dracula" },
  { value: "vscodelight", label: "VSCode Light" },
  { value: "sublime", label: "Sublime" },
  { value: "tokyo", label: "Tokyo" },
]

export function ThemesCombobox() {
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {themes.find((t) => t.value === theme)?.label ?? "Select a theme..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search theme..." className="h-9" />
          <CommandList>
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup>
              {themes.map((t) => (
                <CommandItem
                  key={t.value}
                  value={t.value}
                  onSelect={() => {
                    setTheme(t.value as any)
                    setOpen(false)
                  }}
                >
                  {t.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      theme === t.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
