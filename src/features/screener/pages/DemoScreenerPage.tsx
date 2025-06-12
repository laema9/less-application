"use client";

import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import { GripVertical } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialWidgets = [
  { id: "1", name: "Graphique", content: "[Graphique]" },
  { id: "2", name: "Statistiques", content: "[Statistiques clés]" },
  { id: "3", name: "Infos société", content: "[Description de la société]" },
  { id: "4", name: "Actualités", content: "[Fil d'actualités]" },
  { id: "5", name: "Équipe dirigeante", content: "[Liste des dirigeants]" },
];

type Widget = {
  id: string;
  name: string;
  content: string;
};

export default function Dashboard() {
  const [widgets ] = useState<Widget[]>(initialWidgets);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});

  useEffect(() => {
    // Génère un layout par breakpoint
    const defaultLayout: Layout[] = widgets.map((w, i) => ({
      i: w.id,
      x: (i % 3) * 4,
      y: Math.floor(i / 3) * 6,
      w: 4,
      h: 6,
    }));

    setLayouts({
      lg: defaultLayout,
    });
  }, [widgets]);

  const handleLayoutChange = (_: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
  };

  return (
    <main className="w-full min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Dashboard Interactif</h1>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2 }}
        rowHeight={30}
        margin={[16, 16]}
        isResizable
        isDraggable
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        compactType="vertical"
      >
        {widgets.map((widget) => (
          <div key={widget.id} className="bg-card rounded-2xl shadow p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2 drag-handle cursor-move">
              <h3 className="text-lg font-semibold">{widget.name}</h3>
              <GripVertical className="opacity-50" />
            </div>
            <div className="text-sm text-muted-foreground">{widget.content}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}
