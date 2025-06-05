import { Settings, Bell, Globe, User, Accessibility } from "lucide-react"
import { ThemesCombobox } from "../components/ThemesCombobox"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Switch } from "@/shared/ui/switch"
import { Label } from "@/shared/ui/label"
import { useNavigate } from "react-router-dom"

export default function SettingsPage() {
  const navigate = useNavigate()

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-6">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Application Settings</h1>
      </div>

      {/* Theme Section */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Select your preferred interface theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemesCombobox />
        </CardContent>
      </Card>

      {/* Language Section */}
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Choose your application language.</CardDescription>
        </CardHeader>
        <CardContent>
        {/* insert language option here */}
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email alerts</Label>
            <Switch id="email" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push">Push notifications</Label>
            <Switch id="push" />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Section */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Adjust accessibility features for better usability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Reduce animations</Label>
            <Switch id="animations" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="contrast">High contrast mode</Label>
            <Switch id="contrast" />
          </div>
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account information and security.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => navigate("/account")}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Access account settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
