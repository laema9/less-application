import { Settings } from "lucide-react"
import { ThemesCombobox } from "../components/ThemesCombobox"

export default function SettingsPage(){
    return (
        <div>
            <div className="p-1 flex items-center mt-5 gap-5">
                <Settings />
                <p className="text-xl">Application Settings</p>
            </div>

            <div className="mt-10 p-5">
                <p className="text-base mb-5">Choose a theme</p>
                <ThemesCombobox />
            </div>
        </div>
    )
}