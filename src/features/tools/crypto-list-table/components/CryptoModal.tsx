"use client"

import { useMediaQuery } from "../hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer"

import { formatPrice, formatVolume } from "./utils"
import { MiniChart } from "react-ts-tradingview-widgets"

interface CryptoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: {
    id: string
    name: string
    symbol: string
    rank: number
    price: number
    changePercent24h: number
    marketCap: number
    volume24h: number
    isFavorite: boolean
  }
  onToggleFavorite: () => void
}

export function CryptoModal({ open, onOpenChange, data }: CryptoModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { name, symbol, rank, price, changePercent24h, marketCap, volume24h } = data

  const Content = (
    <>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Rank</span><span>{rank}</span></div>
        <div className="flex justify-between"><span>Price</span><span>{formatPrice(price)}</span></div>
        <div className="flex justify-between">
          <span>24h Change</span>
          <span className={changePercent24h >= 0 ? "text-green-300" : "text-red-400"}>
            {changePercent24h >= 0 ? "+" : ""}
            {changePercent24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between"><span>Market Cap</span><span>{formatVolume(marketCap)}</span></div>
        <div className="flex justify-between"><span>Volume 24h</span><span>{formatVolume(volume24h)}</span></div>
      </div>

      <div className="w-full h-[300px]">
        <MiniChart
          symbol={`BITSTAMP:${symbol}USD`}
          width="100%"
          height="100%"
          locale="en"
          dateRange="12M"
          colorTheme="dark"
          isTransparent={true}
          autosize={true}
        />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-2">Statistics</h2>
        <p className="text-sm text-muted-foreground">Data Data Data...</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Technicals</h2>
        <p className="text-sm text-muted-foreground">Data Data Data...</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-sm text-muted-foreground">Data Data Data...</p>
      </section>
    </>
  )

  return isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg sm:h-auto sm:rounded-lg sm:shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>{symbol} <span className="text-muted-foreground text-sm font-normal">({name})</span></DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[80vh] space-y-6">
          {Content}
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-0 rounded-t-xl max-h-[90dvh] flex flex-col">
        <DrawerHeader className="text-left px-4 pt-6">
          <DrawerTitle>{symbol} <span className="text-muted-foreground text-sm font-normal">({name})</span></DrawerTitle>
        </DrawerHeader>
        <div
          className="overflow-y-auto px-4 pb-6 space-y-6"
          style={{ maxHeight: "calc(90dvh - 80px)" }} // 80px = approx. height of header
        >
          {Content}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
