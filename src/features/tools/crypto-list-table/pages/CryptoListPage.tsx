import { CryptoListTable } from "../components/CryptoListTable"

export default function CryptoListPage(){
    return(
        <div className="sm:p-5 p-0">
            <h1 className="mt-10 mb-5 text-xl">Cryptocurrency top list</h1>

            <CryptoListTable />
        </div>
    )
}