import Link from "next/link";

type Widget = {
  id: string;
  title: string;
  description: string;
  path: string;
  color: string;
  emoji: string;
};

const widgets: Widget[] = [
  // Core Tool Demos
  {
    id: "read_only_widget",
    title: "Read-Only Widget",
    description: "Simple read-only widget displaying time data",
    path: "/widgets/read-only",
    color: "from-purple-500 to-purple-700",
    emoji: "⏰",
  },
  {
    id: "input_calculation_widget",
    title: "Input & Calculation Widget",
    description: "Widget that takes input and performs calculations",
    path: "/widgets/input-calculation",
    color: "from-pink-500 to-pink-700",
    emoji: "🔢",
  },
  {
    id: "widget_accessible_tool",
    title: "Widget Accessible Tool",
    description: "Interactive counter demonstrating widget-accessible tools",
    path: "/widgets/widget-accessible",
    color: "from-blue-500 to-blue-700",
    emoji: "🔄",
  },
  {
    id: "tool_metadata_widget",
    title: "Tool Metadata Widget",
    description: "Weather widget demonstrating tool response metadata",
    path: "/widgets/tool-metadata",
    color: "from-green-500 to-green-700",
    emoji: "🌤️",
  },
  {
    id: "structured_content_widget",
    title: "Structured Content Widget",
    description: "Search results widget displaying structured data",
    path: "/widgets/structured-content",
    color: "from-yellow-500 to-pink-600",
    emoji: "🔍",
  },

  // Method Demo Widgets
  {
    id: "demo_call_tool",
    title: "callTool() Demo",
    description: "Test window.openai.callTool() to invoke MCP tools",
    path: "/widgets/call-tool",
    color: "from-blue-500 to-blue-700",
    emoji: "🔧",
  },
  {
    id: "demo_send_message",
    title: "sendFollowUpMessage() Demo",
    description: "Test window.openai.sendFollowUpMessage() to add messages",
    path: "/widgets/send-message",
    color: "from-green-500 to-green-700",
    emoji: "💬",
  },
  {
    id: "demo_open_external",
    title: "openExternal() Demo",
    description: "Test window.openai.openExternal() to open links",
    path: "/widgets/open-external",
    color: "from-purple-500 to-purple-700",
    emoji: "🔗",
  },
  {
    id: "demo_display_mode",
    title: "requestDisplayMode() Demo",
    description: "Test window.openai.requestDisplayMode() to change layout",
    path: "/widgets/display-mode",
    color: "from-indigo-500 to-indigo-700",
    emoji: "📐",
  },
  {
    id: "demo_widget_state",
    title: "setWidgetState() Demo",
    description: "Test window.openai.setWidgetState() to persist state",
    path: "/widgets/widget-state",
    color: "from-orange-500 to-orange-700",
    emoji: "💾",
  },

  // _meta Field Demos
  {
    id: "show_widget_description_demo",
    title: "widgetDescription Demo",
    description: "Demonstrates openai/widgetDescription _meta field",
    path: "/widget-description-demo",
    color: "from-cyan-500 to-cyan-700",
    emoji: "📝",
  },
  {
    id: "show_widget_border_demo",
    title: "widgetPrefersBorder Demo",
    description: "Demonstrates openai/widgetPrefersBorder _meta field",
    path: "/widget-border-demo",
    color: "from-teal-500 to-teal-700",
    emoji: "🖼️",
  },
  {
    id: "show_widget_csp_demo",
    title: "widgetCSP Demo",
    description: "Demonstrates openai/widgetCSP _meta field",
    path: "/widget-csp-demo",
    color: "from-violet-500 to-violet-700",
    emoji: "🔒",
  },
  {
    id: "show_widget_domain_demo",
    title: "widgetDomain Demo",
    description: "Demonstrates openai/widgetDomain _meta field",
    path: "/widget-domain-demo",
    color: "from-fuchsia-500 to-fuchsia-700",
    emoji: "🌐",
  },

  // Other Pages
  {
    id: "api_dashboard",
    title: "API Dashboard",
    description: "Complete overview of OpenAI Apps SDK",
    path: "/api-dashboard",
    color: "from-slate-600 to-slate-800",
    emoji: "📊",
  },
];

export default function MethodsPlayground() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            OpenAI Apps SDK Widgets
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore interactive widget demos showcasing the OpenAI Apps SDK capabilities.
            Click any card to view the widget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <Link
              key={widget.id}
              href={widget.path}
              className="block group"
            >
              <div className={`bg-gradient-to-br ${widget.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{widget.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:underline">
                      {widget.title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {widget.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm font-semibold opacity-75 group-hover:opacity-100">
                  <span>View Demo</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Built with Next.js, Apps SDK, and MCP Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
