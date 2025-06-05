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
      <span className={isPositive ? "text-green-500" : "text-red-500"}>
        {value}
      </span>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full text-sm md:text-base table-fixed">
        <TableCaption className="text-xs text-muted-foreground">
          Updated a second ago. Source: CoinGecko.com
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Top</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[120px]">Price</TableHead>
            <TableHead className="w-[100px]">Hour</TableHead>
            <TableHead className="w-[100px]">Day</TableHead>
            <TableHead className="w-[100px]">Week</TableHead>
            <TableHead className="w-[120px]">Mcap</TableHead>
            <TableHead className="w-[140px]">Volume</TableHead>
            <TableHead className="w-[140px]">Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((crypto) => (
            <TableRow key={crypto.Top + crypto.Name}>
              <TableCell className="font-medium">{crypto.Top}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-500" />
                  <span>{crypto.Name}</span>
                </div>
              </TableCell>
              <TableCell>{crypto.Price}</TableCell>
              <TableCell>{formatPercent(crypto.Hour)}</TableCell>
              <TableCell>{formatPercent(crypto.Day)}</TableCell>
              <TableCell>{formatPercent(crypto.Week)}</TableCell>
              <TableCell>{crypto.Mcap}</TableCell>
              <TableCell>{crypto.Volume}</TableCell>
              <TableCell>{crypto.Supply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9}>
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
