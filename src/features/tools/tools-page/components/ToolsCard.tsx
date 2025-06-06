import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Plus } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

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
  return (
    <Card className="relative w-full overflow-hidden">
      {/* Badge en haut à gauche */}
      <div className="absolute left-4 top-4 z-10">
        <Badge variant="outline">{category}</Badge>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full p-2 mt-7 h-40 object-cover rounded-xl"
      />

      {/* Contenu de la carte */}
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent />

      {/* Footer avec bouton */}
      <CardFooter>
            <Button variant="outline" size="sm">
                <Plus /> Add to screener
            </Button>
      </CardFooter>
    </Card>
  )
}
