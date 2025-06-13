import { ScreenerContextMenu } from "../components/ScreenerContextMenu";
import { ScreenerMenuBar } from "../components/ScreenerMenuBar";

export default function ScreenerPage() {
    return(
        <div className="sm:p-5 p-0 mt-5">
            <ScreenerMenuBar/>

            <div className="">
                <ScreenerContextMenu />
            </div>
        </div>
    )
}