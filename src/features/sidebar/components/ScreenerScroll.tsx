import { ScrollArea } from "@/shared/ui/scroll-area"
import { Separator } from "@/shared/ui/separator"
import { ExternalLink } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Link } from "react-router-dom" 

type ScreenerItem = {
  name: string
  href: string
}

const myScreeners: ScreenerItem[] = [
  { name: "Day Trading", href: "/screeners/day-trading" },
  { name: "Low Cap Gems", href: "/screeners/low-caps" },
  { name: "Low Cap Gems", href: "/screeners/low-caps" },
  { name: "Low Cap Gems", href: "/screeners/low-caps" },
  { name: "Low Cap Gems", href: "/screeners/low-caps" },
  { name: "Low Cap Gems", href: "/screeners/low-caps" },
  { name: "Low Cap Gems", href: "/screeners/low-caps" },
]

const templateScreeners: ScreenerItem[] = [
  { name: "Top Volume", href: "/templates/volume" },
  { name: "High Volatility", href: "/templates/volatility" },
]

const communityScreeners: ScreenerItem[] = [
  { name: "Altcoin Radar", href: "/community/altcoin-radar" },
  { name: "DeFi Watch", href: "/community/defi-watch" },
]

function ScreenerSection({
  title,
  items,
}: {
  title: string
  items: ScreenerItem[]
}) {
  return (
    <div className="mb-4">
      <h4 className="mb-2 text-sm font-medium leading-none">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition"
          >
            <span>{item.name}</span>
            <ExternalLink className="h-4 w-4 opacity-70" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ScreenerScroll() {
  return (
    <ScrollArea className="h-96 w-full rounded-md border">
      <div className="p-4 space-y-4">
        <ScreenerSection title="My screener" items={myScreeners} />
        <Separator />
        <ScreenerSection title="Template screener" items={templateScreeners} />
        <Separator />
        <ScreenerSection title="Saved community screener" items={communityScreeners} />

        <div className="pt-2">
          <Button variant="link" className="text-sm px-0" asChild>
            <Link to="/community">Explore community</Link>
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}
