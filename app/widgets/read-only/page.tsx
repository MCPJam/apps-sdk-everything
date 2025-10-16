"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimeOutput = {
  timestamp: string;
  timezone: string;
  unixTimestamp: number;
};

export default function ReadOnlyWidget() {
  const output = useToolOutput<TimeOutput>();

  if (output === null) {
    return (
      <div className="w-full p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              Loading...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const date = new Date(output.timestamp);

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Current Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-semibold">{date.toLocaleTimeString()}</div>
            <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Timezone</span>
              <span className="font-mono">{output.timezone}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">ISO</span>
              <span className="font-mono text-xs">{output.timestamp}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Unix</span>
              <span className="font-mono">{output.unixTimestamp}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
