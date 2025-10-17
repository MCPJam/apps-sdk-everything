"use client";

import { useRequestDisplayMode } from '../../hooks/use-request-display-mode';
import { useDisplayMode } from '../../hooks/use-display-mode';
import { useState } from 'react';
import type { DisplayMode } from '../../hooks/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DisplayModeWidget() {
  const requestDisplayMode = useRequestDisplayMode();
  const currentDisplayMode = useDisplayMode();
  const [requestedMode, setRequestedMode] = useState<DisplayMode>("fullscreen");
  const [displayModeResult, setDisplayModeResult] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestDisplayMode = async () => {
    setDisplayModeResult(null);
    setIsLoading(true);
    try {
      const result = await requestDisplayMode(requestedMode);
      setDisplayModeResult(result);
    } catch (error) {
      setDisplayModeResult({ success: false, error: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Change Display Mode</CardTitle>
          <CardDescription>Transition between inline, PiP, and fullscreen using requestDisplayMode()</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">Current Mode</span>
            <Badge variant="secondary">{currentDisplayMode || 'unknown'}</Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Request Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {(["inline", "pip", "fullscreen"] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={requestedMode === mode ? "default" : "outline"}
                  onClick={() => setRequestedMode(mode)}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleRequestDisplayMode}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Requesting...' : 'Request Display Mode'}
          </Button>

          {displayModeResult !== null && (
            <div className={`p-3 border rounded-md ${
              !(displayModeResult as any).success
                ? 'border-destructive bg-destructive/10'
                : 'bg-muted'
            }`}>
              <p className="text-sm font-medium mb-2">Result</p>
              <pre className="text-xs font-mono overflow-x-auto">
                {JSON.stringify(displayModeResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
