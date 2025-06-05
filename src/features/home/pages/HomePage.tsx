import { CryptoListTable } from "@/features/tools/crypto-list-table/components/CryptoListTable";
import HomepageCards from "../components/HomepageCards";

export default function HomePage() {
  return (
    <div className="p-4">
      
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <HomepageCards />
        </div>
        <div className="hidden sm:flex flex-1 min-w-[200px]">
          <HomepageCards />
        </div>
        <div className="hidden md:flex flex-1 min-w-[200px]">
          <HomepageCards />
      </div>
    </div>

      <section className="mt-6 ">
        <CryptoListTable />
      </section>
    </div>
  )
}
