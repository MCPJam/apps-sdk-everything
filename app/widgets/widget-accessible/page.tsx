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

  // Use default values if no tool output available
  const defaultOutput: CounterOutput = {
    counter: 0,
    incrementAmount: 1,
    timestamp: new Date().toISOString(),
  };

  const counterOutput = output || defaultOutput;

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
            <div className="text-5xl font-semibold">{counterOutput.counter}</div>
            <div className="text-sm text-muted-foreground">Current Value</div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleIncrement(1)}
              disabled={isIncrementing || !callTool}
            >
              +1
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleIncrement(5)}
              disabled={isIncrementing || !callTool}
            >
              +5
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleIncrement(10)}
              disabled={isIncrementing || !callTool}
            >
              +10
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last Increment</span>
              <span className="font-mono">{counterOutput.incrementAmount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Updated</span>
              <span className="font-mono text-xs">
                {new Date(counterOutput.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
          {!callTool && (
            <div className="text-xs text-muted-foreground text-center">
              Note: Tool calling only available when invoked via ChatGPT
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
