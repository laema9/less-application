import HomepageCards from "../components/HomepageCards";
import MobileCryptoListTable from "@/features/tools/crypto-list-table/components/MobileCryptoListTable"


export default function HomePage() {
  return (
    <div className="sm:p-5 p-0 mt-3">
      
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
        <MobileCryptoListTable/>
      </section>
    </div>
  )
}
