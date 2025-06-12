import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardContent } from "@/shared/ui/card";
import { GripVertical } from "lucide-react";

const initialWidgets = [
  { id: "1", name: "Graphique", content: "[Graphique]" },
  { id: "2", name: "Statistiques", content: "[Statistiques clés]" },
  { id: "3", name: "Infos société", content: "[Description de la société]" },
  { id: "4", name: "Actualités", content: "[Fil d'actualités]" },
  { id: "5", name: "Équipe dirigeante", content: "[Liste des dirigeants]" },
];

function SortableGridItem({ id, name, content }: { id: string; name: string; content: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-card rounded-2xl shadow p-4 min-w-[300px] min-h-[200px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <GripVertical className="cursor-move" {...listeners} />
      </div>
      <CardContent className="flex-1 text-sm text-muted-foreground">{content}</CardContent>
    </div>
  );
}

export default function Dashboard() {
  const [widgets, setWidgets] = useState(initialWidgets);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over?.id);
      setWidgets((widgets) => arrayMove(widgets, oldIndex, newIndex));
    }
  }

  return (
    <main className="w-full min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Dashboard Interactif</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => (
              <SortableGridItem key={widget.id} {...widget} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
}
