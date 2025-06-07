import { toast } from "sonner"

export function showAddToScreenerToast(toolName: string, screenerName: string) {
  toast(`${toolName} added to screener`, {
    description: `Screener: ${screenerName}`,
    action: {
      label: "Access",
      onClick: () => {
        console.log(`Access screener: ${screenerName}`)
      },
    },
  })
}
