"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOpenAIGlobal } from "@/app/hooks/use-openai-global";

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

  // Widget API
  { id: "demo_send_message", title: "Send Follow Up Message", category: "Widget API", path: "/widgets/send-message" },
  { id: "demo_open_external", title: "Open External Links", category: "Widget API", path: "/widgets/open-external" },
  { id: "demo_display_mode", title: "Change Display Mode", category: "Widget API", path: "/widgets/display-mode" },
  { id: "demo_widget_state", title: "Save Widget State", category: "Widget API", path: "/widgets/widget-state" },
  { id: "demo_resize", title: "Resize Widget", category: "Widget API", path: "/widgets/resize" },
  { id: "demo_modal", title: "Request Modal", category: "Widget API", path: "/widgets/modal" },
  { id: "demo_popover", title: "Popover Component", category: "Widget API", path: "/widgets/popover" },

  // Widget Metadata
  { id: "show_widget_description_demo", title: "Widget Description", category: "Widget Metadata", path: "/widget-description-demo" },
  { id: "show_widget_csp_demo", title: "Security Policy (CSP)", category: "Widget Metadata", path: "/widget-csp-demo" },
];

export default function MethodsPlayground() {
  const view = useOpenAIGlobal("view");
  const isModalView = view?.mode === "modal";
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (isModalView) {
    return (
      <div className="w-full p-6">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>This is a Modal! 🎉</CardTitle>
            <CardDescription>You're viewing this page in modal mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page was opened as a modal. You can interact with the content below!
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleClick}
                className={`w-full ${isAnimating ? "scale-95" : "scale-100"} transition-transform`}
              >
                Click Me! ({clickCount})
              </Button>
              {clickCount > 0 && (
                <div className="text-center text-sm text-muted-foreground">
                  You've clicked {clickCount} time{clickCount !== 1 ? "s" : ""}!
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => setClickCount(0)}
                disabled={clickCount === 0}
              >
                Reset Counter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
