"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function WidgetBorderDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>widgetPrefersBorder: true</CardTitle>
          <CardDescription>
            This widget has <code className="bg-muted px-2 py-0.5 rounded text-xs">widgetPrefersBorder: true</code> set in its _meta
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-semibold">Look Around This Widget</h2>
            <p className="text-sm text-muted-foreground">
              The <code className="bg-muted px-1.5 py-0.5 rounded text-xs">widgetPrefersBorder</code> hint tells ChatGPT to render this widget inside a bordered card container.
            </p>
            <p className="text-sm text-muted-foreground">
              Check if there's a rounded border or card effect around this entire widget frame (not the dashed border you see here, but the outer container).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Note:</span> The border is added by ChatGPT's UI, not by our CSS. It provides visual separation from other content in the conversation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
