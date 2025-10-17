import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Widget = {
  id: string;
  title: string;
  category: string;
  path: string;
};

const widgets: Widget[] = [
  // Tool Examples
  { id: "read_only_widget", title: "Read-Only Data", category: "Tool Example", path: "/widgets/read-only" },
  { id: "widget_accessible_tool", title: "Call Tools from Widget", category: "Tool Example", path: "/widgets/widget-accessible" },
  { id: "tool_metadata_widget", title: "Tool Response Data", category: "Tool Example", path: "/widgets/tool-metadata" },

  // Widget API
  { id: "demo_send_message", title: "Send Messages", category: "Widget API", path: "/widgets/send-message" },
  { id: "demo_open_external", title: "Open External Links", category: "Widget API", path: "/widgets/open-external" },
  { id: "demo_display_mode", title: "Change Display Mode", category: "Widget API", path: "/widgets/display-mode" },
  { id: "demo_widget_state", title: "Save Widget State", category: "Widget API", path: "/widgets/widget-state" },

  // Widget Metadata
  { id: "show_widget_description_demo", title: "Widget Description", category: "Widget Metadata", path: "/widget-description-demo" },
  { id: "show_widget_csp_demo", title: "Security Policy (CSP)", category: "Widget Metadata", path: "/widget-csp-demo" },
];

export default function MethodsPlayground() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Widgets</h1>
        <p className="text-muted-foreground">Apps SDK Examples</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget) => (
          <Link key={widget.id} href={widget.path}>
            <Card className="hover:border-foreground/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{widget.category}</Badge>
                </div>
                <CardTitle className="text-lg">{widget.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
