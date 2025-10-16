"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { useCallTool } from '../../hooks/use-call-tool';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type CounterOutput = {
  counter: number;
  incrementAmount: number;
  timestamp: string;
};

export default function WidgetAccessibleTool() {
  const output = useToolOutput<CounterOutput>();
  const callTool = useCallTool();
  const [isIncrementing, setIsIncrementing] = useState(false);

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

  const handleIncrement = async (amount: number) => {
    if (!callTool) {
      console.error('callTool not available');
      return;
    }

    setIsIncrementing(true);
    try {
      await callTool('widget_accessible_tool', { amount });
    } catch (error) {
      console.error('Failed to increment:', error);
    } finally {
      setIsIncrementing(false);
    }
  };

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Interactive Counter</CardTitle>
          <CardDescription>Widget can call tools directly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-5xl font-semibold">{output.counter}</div>
            <div className="text-sm text-muted-foreground">Current Value</div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleIncrement(1)}
              disabled={isIncrementing}
            >
              +1
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleIncrement(5)}
              disabled={isIncrementing}
            >
              +5
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleIncrement(10)}
              disabled={isIncrementing}
            >
              +10
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last Increment</span>
              <span className="font-mono">{output.incrementAmount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Updated</span>
              <span className="font-mono text-xs">
                {new Date(output.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
