import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import { Badge } from "@/shared/ui/badge"

const etf = [
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
    { id: 1, ticker: "IBIT", name: "iShares Bitcoin Trust", price: "$43.4", volume: "34B", status: "Running" },
]

const EtfTable = () => {
    return (
        <div lang="w-full">

            <Table>
                <TableCaption>
                    Source: ETFTrust.com
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Ticker</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {etf.map((etf) => (
                    <TableRow key ={etf.id}>
                        <TableCell>{etf.ticker}</TableCell>
                        <TableCell>{etf.name}</TableCell>
                        <TableCell>{etf.price}</TableCell>
                        <TableCell>{etf.volume}</TableCell>
                        <TableCell>
                            <Badge className="bg-green-800 hover:bg-gray-400 text-white">{etf.status}</Badge>
                        </TableCell>
                    </TableRow>
                    )
                )}
                </TableBody>
            </Table>
            
        </div>
    )
}

export default EtfTable; 