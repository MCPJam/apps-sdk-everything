"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WidgetDescriptionDemo() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>widgetDescription Demo</CardTitle>
          <CardDescription>Shows how AI receives context without seeing the full UI</CardDescription>
        </CardHeader>
      </Card>

      {/* Simulated Dashboard - What User Sees */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">What User Sees 👁️</CardTitle>
          <CardDescription>A complex dashboard with multiple data points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                <div className="text-2xl font-bold">$124.5K</div>
                <Badge className="mt-2" variant="default">+12.3%</Badge>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Users</div>
                <div className="text-2xl font-bold">8,432</div>
                <Badge className="mt-2" variant="default">+5.7%</Badge>
              </div>
              <div className="bg-destructive/10 p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Churn</div>
                <div className="text-2xl font-bold">2.4%</div>
                <Badge className="mt-2" variant="destructive">+0.3%</Badge>
              </div>
            </div>

            {/* Fake Chart */}
            <div className="bg-muted p-6 rounded-lg">
              <div className="flex items-end justify-between h-32 gap-2">
                {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                  <div key={i} className="bg-primary rounded-t flex-1" style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="text-xs text-center text-muted-foreground mt-2">Weekly Activity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What AI Receives */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-base">What AI Receives via widgetDescription 🤖</CardTitle>
          <CardDescription>Concise, structured context - no verbose UI description needed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="text-sm font-mono text-primary">
              "Sales dashboard for Q4 2024 showing revenue $124.5K (↑12.3%), active users 8,432 (↑5.7%), and churn rate 2.4% (↑0.3%). Weekly activity trend is positive."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Benefit */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <p className="text-sm">
              <span className="font-semibold text-foreground">✨ Benefit:</span> The AI understands your complex dashboard instantly without needing to narrate every visual element, button, color, and layout detail.
            </p>
            <p className="text-xs text-muted-foreground">
              Without widgetDescription, the AI would need to describe: "The user sees a dashboard with three cards showing revenue of $124.5K with a green badge indicating +12.3%, then users count of 8,432 with +5.7%..." and so on. With widgetDescription, it just receives the essential context.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
