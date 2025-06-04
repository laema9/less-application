import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
