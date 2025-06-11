import { ScreenerContextMenu } from "../components/ScreenerContextMenu";

export default function ScreenerPage() {
    return(
        <div className="sm:p-5 p-0 mt-5">
            <p className="text-xl">LESS Screener 0.0.1</p>

            <div className="mt-5">
                <ScreenerContextMenu />
            </div>
        </div>
    )
}