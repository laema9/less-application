import { ToolsCard } from "../components/ToolsCard";

export default function ToolsPage() {
  return (
    <div className="p-5">
      <div className="mb-4 text-xl font-semibold">Our tools list</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ToolsCard
            category="Analytics"
            imageUrl="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
            title="Crypto Screener"
            description="Filter cryptocurrencies by volume, trend, and market cap."
            />

            <ToolsCard
            category="Analytics"
            imageUrl="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
            title="Volume Tracker"
            description="Real-time analysis of trading volumes across major markets."
            />

            <ToolsCard
            category="Analytics"
            imageUrl="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
            title="Price Alerts"
            description="Set custom alerts to get notified of token price changes."
            />

            <ToolsCard
            category="Analytics"
            imageUrl="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
            title="Watchlist"
            description="Create and manage your personalized list of tracked tokens. "
            />

            <ToolsCard
            category="Analytics"
            imageUrl="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
            title="Market Heatmap"
            description="Visualize market performance by market cap and price change."
            />

            <ToolsCard
            category="Analytics"
            imageUrl="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
            title="Top Gainers & Losers"
            description="Rank cryptocurrencies with the highest and lowest 24h changes."
            />
      </div>
    </div>
  );
}
