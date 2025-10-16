"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function WidgetDescriptionDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>widgetDescription</CardTitle>
          <CardDescription>Provides hidden context to the AI about widget content</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What User Sees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="text-sm font-medium">Weather: 72°F Sunny</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What AI Sees (widgetDescription)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs font-mono">
              "A minimal demo showing the widgetDescription _meta field"
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Benefit:</span> The AI understands widget content without redundant narration, enabling more natural conversation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
