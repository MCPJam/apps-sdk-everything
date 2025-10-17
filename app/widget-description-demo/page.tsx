"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function WidgetDescriptionDemo() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>widgetDescription</CardTitle>
          <CardDescription>Provides hidden context to the AI without verbose UI narration</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What User Sees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted p-4 rounded-lg text-center space-y-1">
              <div className="text-2xl font-semibold">$124.5K</div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center space-y-1">
              <div className="text-2xl font-semibold">8,432</div>
              <div className="text-xs text-muted-foreground">Users</div>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center space-y-1">
              <div className="text-2xl font-semibold">2.4%</div>
              <div className="text-xs text-muted-foreground">Churn</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What AI Receives</CardTitle>
          <CardDescription>Via widgetDescription metadata field</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm font-mono">
              "Sales dashboard showing revenue $124.5K, active users 8,432, and churn rate 2.4%"
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Benefit:</span> The AI understands the widget instantly without narrating every visual element, enabling more natural conversation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
