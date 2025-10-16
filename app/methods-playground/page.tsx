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
  // Core Demos
  { id: "read_only_widget", title: "Read-Only", category: "Tool", path: "/widgets/read-only" },
  { id: "input_calculation_widget", title: "Calculation", category: "Tool", path: "/widgets/input-calculation" },
  { id: "widget_accessible_tool", title: "Interactive Counter", category: "Tool", path: "/widgets/widget-accessible" },
  { id: "tool_metadata_widget", title: "Metadata", category: "Tool", path: "/widgets/tool-metadata" },
  { id: "structured_content_widget", title: "Structured Content", category: "Tool", path: "/widgets/structured-content" },

  // Methods
  { id: "demo_call_tool", title: "callTool()", category: "Method", path: "/widgets/call-tool" },
  { id: "demo_send_message", title: "sendFollowUpMessage()", category: "Method", path: "/widgets/send-message" },
  { id: "demo_open_external", title: "openExternal()", category: "Method", path: "/widgets/open-external" },
  { id: "demo_display_mode", title: "requestDisplayMode()", category: "Method", path: "/widgets/display-mode" },
  { id: "demo_widget_state", title: "setWidgetState()", category: "Method", path: "/widgets/widget-state" },

  // Meta Fields
  { id: "show_widget_description_demo", title: "widgetDescription", category: "Meta", path: "/widget-description-demo" },
  { id: "show_widget_border_demo", title: "widgetPrefersBorder", category: "Meta", path: "/widget-border-demo" },
  { id: "show_widget_csp_demo", title: "widgetCSP", category: "Meta", path: "/widget-csp-demo" },
  { id: "show_widget_domain_demo", title: "widgetDomain", category: "Meta", path: "/widget-domain-demo" },
];

export default function MethodsPlayground() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Widgets</h1>
        <p className="text-muted-foreground">Apps SDK demonstrations</p>
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
