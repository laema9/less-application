"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { Star } from "lucide-react"
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

export function CryptoModal({ open, onOpenChange, data, onToggleFavorite }: CryptoModalProps) {
  const { name, symbol, rank, price, changePercent24h, marketCap, volume24h, isFavorite } = data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-full max-w-full h-dvh rounded-none shadow-none p-0
          sm:max-w-xl sm:h-auto sm:rounded-lg sm:shadow-lg sm:p-6
        "
      >
        <div className="p-4 sm:p-0 pb-36 overflow-y-auto h-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{symbol}</span>
              <span className="text-muted-foreground text-sm font-normal">({name})</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 text-sm mt-4">
            <div className="flex justify-between">
              <span>Rank</span>
              <span>{rank}</span>
            </div>
            <div className="flex justify-between">
              <span>Price</span>
              <span>{formatPrice(price)}</span>
            </div>
            <div className="flex justify-between">
              <span>24h Change</span>
              <span className={changePercent24h >= 0 ? "text-green-300" : "text-red-400"}>
                {changePercent24h >= 0 ? "+" : ""}
                {changePercent24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Market Cap</span>
              <span>{formatVolume(marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span>Volume 24h</span>
              <span>{formatVolume(volume24h)}</span>
            </div>
          </div>

          {/* TradingView Chart */}
          <div className="mt-6 w-full h-[300px]">
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

          {/* sections */}
          <section className="mt-[50px]">
            <h2 className="text-lg font-semibold mb-2">Statistics</h2>
            <p className="text-sm text-muted-foreground">Data Data Data Data Data Data Data Data</p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Technicals datas</h2>
            <p className="text-sm text-muted-foreground">Data Data Data Data Data Data Data Data</p>
          </section>

          <section className="mt-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm text-muted-foreground">Data Data Data Data Data Data Data Data</p>
          </section>
        </div>

        {/* fixed footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t sm:static sm:border-none px-4 py-3 sm:p-0">
          <div className="flex flex-col gap-2 sm:hidden">
            <Button variant="outline" onClick={onToggleFavorite} className="w-full">
              <Star
                className={`h-4 w-4 mr-2 ${
                  isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            <DialogClose asChild>
              <Button className="w-full">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
