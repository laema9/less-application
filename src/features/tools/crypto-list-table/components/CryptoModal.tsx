"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { TrendingUp, TrendingDown, Star } from "lucide-react"
import { formatPrice, formatVolume } from "./utils"

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
  const changeIcon = changePercent24h >= 0 ? (
    <TrendingUp className="h-4 w-4 text-green-300" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-400" />
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{symbol}</span>
            <span className="text-muted-foreground text-sm font-normal">({name})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
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
              {changeIcon} {changePercent24h >= 0 ? "+" : ""}
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

        <DialogFooter className="mt-4">
          {/* ✅ Ce bouton ne s'affiche que sur mobile */}
          <div className="sm:hidden w-full">
            <Button variant="outline" onClick={onToggleFavorite} className="w-full">
              <Star
                className={`h-4 w-4 mr-2 ${
                  isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>

          <DialogClose asChild>
            <Button className="w-full mt-2">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
