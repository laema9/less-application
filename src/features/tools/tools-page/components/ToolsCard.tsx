import { useState } from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Plus, Check, ChevronsUpDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/ui/popover"
import { cn } from "@/lib/utils"
import { showAddToScreenerToast } from "@/features/tools/tools-page/lib/toast" 
type ToolsCardProps = {
  category?: string
  imageUrl?: string
  title?: string
  description?: string
}

export function ToolsCard({
  category = "Uncategorized",
  imageUrl = "https://via.placeholder.com/600x300?text=No+Image",
  title = "Untitled Tool",
  description = "No description provided.",
}: ToolsCardProps) {
  const existingScreeners = ["My Screener", "Trading Setup", "Favorites"]

  const [dialogOpen, setDialogOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedScreener, setSelectedScreener] = useState("")
  const [newScreener, setNewScreener] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const screenerToUse = newScreener || selectedScreener
    if (!screenerToUse) return
    showAddToScreenerToast(title, screenerToUse) // ✅ toast ici
    setDialogOpen(false)
    setSelectedScreener("")
    setNewScreener("")
  }

  return (
    <Card className="relative w-full overflow-hidden">
      {/* Badge */}
      <div className="absolute left-4 top-4 z-10">
        <Badge variant="outline">{category}</Badge>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full p-2 mt-7 h-40 object-cover rounded-xl"
      />

      {/* Content */}
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent />

      {/* Dialog & Button */}
      <CardFooter>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add to screener
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add "{title}" to screener</DialogTitle>
                <DialogDescription>
                  Choose an existing screener or create a new one.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Combobox */}
                <div className="grid gap-2">
                  <Label>Select existing screener</Label>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {selectedScreener || "Select a screener..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search screener..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No screener found.</CommandEmpty>
                          <CommandGroup>
                            {existingScreeners.map((screener) => (
                              <CommandItem
                                key={screener}
                                value={screener}
                                onSelect={(value) => {
                                  setSelectedScreener(value)
                                  setNewScreener("")
                                  setPopoverOpen(false)
                                }}
                              >
                                {screener}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    selectedScreener === screener
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* New screener input */}
                <div className="grid gap-2">
                  <Label htmlFor="new-screener">Or create new screener</Label>
                  <Input
                    id="new-screener"
                    placeholder="Enter new screener name"
                    value={newScreener}
                    onChange={(e) => {
                      setNewScreener(e.target.value)
                      setSelectedScreener("")
                      setPopoverOpen(false)
                    }}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add to screener</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
