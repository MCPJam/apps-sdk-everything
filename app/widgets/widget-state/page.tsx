"use client";

import { useWidgetState } from '../../hooks/use-widget-state';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function WidgetStateWidget() {
  const [widgetState, setWidgetState] = useWidgetState();
  const [stateJson, setStateJson] = useState(
    JSON.stringify({ counter: 0, data: "test", timestamp: new Date().toISOString() }, null, 2)
  );
  const [stateResult, setStateResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSetWidgetState = async () => {
    setStateResult(null);
    setError(null);
    try {
      const state = JSON.parse(stateJson);
      setWidgetState(state);
      setStateResult({ success: true, message: "Widget state updated" });
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setStateResult({ success: false, error: String(error) });
    }
  };

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>setWidgetState()</CardTitle>
          <CardDescription>Persist component state (max ~4k tokens)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Widget State</label>
            <pre className="text-xs font-mono overflow-x-auto bg-muted p-3 rounded-md">
              {JSON.stringify(widgetState, null, 2)}
            </pre>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New State (JSON)</label>
            <Textarea
              value={stateJson}
              onChange={(e) => setStateJson(e.target.value)}
              rows={8}
              className="font-mono text-sm"
              placeholder='{"key": "value"}'
            />
          </div>

          <Button onClick={handleSetWidgetState} className="w-full">
            Set Widget State
          </Button>

          {error && (
            <div className="p-3 border border-destructive bg-destructive/10 rounded-md">
              <p className="text-sm font-medium mb-1">Error</p>
              <p className="text-xs font-mono">{error}</p>
            </div>
          )}

          {stateResult !== null && !error && (
            <div className={`p-3 border rounded-md ${
              (stateResult as any).success
                ? 'bg-muted'
                : 'border-destructive bg-destructive/10'
            }`}>
              <pre className="text-xs font-mono overflow-x-auto">
                {JSON.stringify(stateResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
