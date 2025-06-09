"use client"

import { useState, useMemo } from "react"
import { TrendingUp, TrendingDown, Star } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { CryptoModal } from "./CryptoModal" 

interface CryptoData {
  id: string
  symbol: string
  name: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  changePercent24h: number
  volume24h: number
  marketCap: number
  supply: number
  rank: number
  isFavorite?: boolean
}

const cryptoData: CryptoData[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.67,
    change1h: 0.15,
    change24h: 1250.45,
    change7d: 3300,
    changePercent24h: 2.98,
    volume24h: 28500000000,
    marketCap: 847000000000,
    supply: 19300000,
    rank: 1,
    isFavorite: true,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2580.34,
    change1h: 0.15,
    change24h: -45.67,
    change7d: 3300,
    changePercent24h: -1.74,
    volume24h: 15200000000,
    marketCap: 310000000000,
    supply: 1930000,
    rank: 2,
    isFavorite: true,

  },  
]

const formatPrice = (price: number) => {
  if (price < 1) return `$${price.toFixed(4)}`
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatVolume = (value: number) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
  return `$${value.toLocaleString()}`
}

const formatChange = (value: number) => {
  const color = value >= 0 ? "text-green-300" : "text-red-400"
  const Icon = value >= 0 ? TrendingUp : TrendingDown
  return (
    <div className={`flex items-center gap-1 justify-end ${color}`}>
      <Icon className="h-3 w-3" />
      <span className="text-sm font-medium">{value >= 0 ? "+" : ""}{value.toFixed(2)}%</span>
    </div>
  )
}

export default function CryptoTradingPage() {
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(cryptoData.filter((c) => c.isFavorite).map((c) => c.id)),
  )
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const sortedCrypto = useMemo(() => [...cryptoData], [])

  const toggleFavorite = (cryptoId: string) => {
    const newFavorites = new Set(favorites)
    newFavorites.has(cryptoId) ? newFavorites.delete(cryptoId) : newFavorites.add(cryptoId)
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-background">
      <Table className="text-base sm:text-sm [&_thead]:border-none [&_tbody]:divide-y [&_tbody]:divide-muted">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell w-[60px]">Top</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Hour</TableHead>
            <TableHead className="text-right hidden md:table-cell">Day</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Week</TableHead>
            <TableHead className="text-right hidden lg:table-cell">Mcap</TableHead>
            <TableHead className="text-right hidden xl:table-cell">Volume</TableHead>
            <TableHead className="text-right hidden xl:table-cell">Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCrypto.map((crypto) => (
            <TableRow
              key={crypto.id}
              onClick={() => {
                setSelectedCrypto(crypto)
                setModalOpen(true)
              }}
              className="cursor-pointer"
            >
              <TableCell className="font-medium hidden sm:table-cell">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(crypto.id)
                    }}
                  >
                    <Star
                      className={`h-3 w-3 ${
                        favorites.has(crypto.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  <span className="text-xs">{crypto.rank}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                    {crypto.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-sm">{crypto.symbol}</div>
                    <div className="text-sm sm:text-xs text-muted-foreground">{crypto.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="font-medium text-base sm:text-sm">{formatPrice(crypto.price)}</div>
                <div className="sm:hidden text-sm text-muted-foreground flex justify-end items-center gap-1 mt-0.5">
                  {crypto.changePercent24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span>
                    {crypto.changePercent24h >= 0 ? "+" : ""}
                    {crypto.changePercent24h.toFixed(2)}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">{formatChange(crypto.change1h)}</TableCell>
              <TableCell className="text-right hidden md:table-cell">{formatChange(crypto.changePercent24h)}</TableCell>
              <TableCell className="text-right hidden lg:table-cell">{formatChange(crypto.change7d)}</TableCell>
              <TableCell className="text-right hidden lg:table-cell">{formatVolume(crypto.marketCap)}</TableCell>
              <TableCell className="text-right hidden xl:table-cell">{formatVolume(crypto.volume24h)}</TableCell>
              <TableCell className="text-right hidden xl:table-cell">{crypto.supply.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedCrypto && (
        <CryptoModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          data={{
            ...selectedCrypto,
            isFavorite: favorites.has(selectedCrypto.id),
          }}
          onToggleFavorite={() => toggleFavorite(selectedCrypto.id)}
        />
      )}
    </div>
  )
}
