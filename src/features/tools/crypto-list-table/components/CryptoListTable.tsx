import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination"

const cryptos = Array.from({ length: 50 }, (_, i) => ({
  Top: `#${i + 1}`,
  Name: `Bitcoin ${i + 1}`,
  Price: "$101,000",
  Hour: i % 2 === 0 ? "+2%" : "-1%",
  Day: i % 3 === 0 ? "-4%" : "+1.5%",
  Week: i % 4 === 0 ? "+17%" : "-3%",
  Mcap: "$4T",
  Volume: "412,000K BTC",
  Supply: "19.87M BTC",
}))

const ROWS_PER_PAGE = 20

export function CryptoListTable() {
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(cryptos.length / ROWS_PER_PAGE)
  const currentPageData = cryptos.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  )

  const formatPercent = (value: string) => {
    const num = parseFloat(value)
    const isPositive = !isNaN(num) && num >= 0
    return (
      <span className={isPositive ? "text-green-400" : "text-red-400"}>
        {value}
      </span>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full text-lg sm:text-base table-auto">
        <TableCaption className="text-muted-foreground text-xs">
          Updated a second ago. Source: CoinGecko.com
        </TableCaption>
        <TableHeader>
          <TableRow className="min-h-[56px]">
            <TableHead className="hidden sm:table-cell w-[60px]">Top</TableHead>
            <TableHead className="min-w-[120px]">Name</TableHead>
            <TableHead className="min-w-[90px]">Price</TableHead>
            <TableHead className="min-w-[80px]">Hour</TableHead>
            <TableHead className="hidden md:table-cell min-w-[80px]">Day</TableHead>
            <TableHead className="hidden lg:table-cell min-w-[80px]">Week</TableHead>
            <TableHead className="hidden lg:table-cell min-w-[100px]">Mcap</TableHead>
            <TableHead className="hidden xl:table-cell min-w-[120px]">Volume</TableHead>
            <TableHead className="hidden xl:table-cell min-w-[120px]">Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((crypto) => (
            <TableRow
              key={crypto.Top + crypto.Name}
              className="min-h-[56px] text-lg sm:text-base"
            >
              <TableCell className="hidden sm:table-cell font-medium">
                {crypto.Top}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-500" />
                  <span className="truncate">{crypto.Name}</span>
                </div>
              </TableCell>
              <TableCell>{crypto.Price}</TableCell>
              <TableCell>{formatPercent(crypto.Hour)}</TableCell>
              <TableCell className="hidden md:table-cell">
                {formatPercent(crypto.Day)}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {formatPercent(crypto.Week)}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{crypto.Mcap}</TableCell>
              <TableCell className="hidden xl:table-cell">{crypto.Volume}</TableCell>
              <TableCell className="hidden xl:table-cell">{crypto.Supply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-transparent">
          <TableRow className="bg-transparent">
            <TableCell colSpan={9} className="bg-transparent">
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={i === page}
                          onClick={() => setPage(i)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {totalPages > 5 && page < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages - 1, p + 1))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
