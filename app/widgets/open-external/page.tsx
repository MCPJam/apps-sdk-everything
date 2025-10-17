"use client";

import { useOpenExternal } from '../../hooks/use-open-external';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OpenExternalWidget() {
  const openExternal = useOpenExternal();
  const [externalUrl, setExternalUrl] = useState("https://developers.openai.com/apps-sdk");
  const [externalResult, setExternalResult] = useState<unknown>(null);

  const handleOpenExternal = () => {
    setExternalResult(null);
    try {
      openExternal(externalUrl);
      setExternalResult({ success: true, message: "External link opened" });
    } catch (error) {
      setExternalResult({ success: false, error: String(error) });
    }
  };

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Open External Links</CardTitle>
          <CardDescription>Open external links or redirect to other pages using openExternal()</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL</label>
            <Input
              type="text"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <Button onClick={handleOpenExternal} className="w-full">
            Open External Link
          </Button>

          {externalResult !== null && (
            <div className={`p-3 border rounded-md ${
              (externalResult as any).success
                ? 'bg-muted'
                : 'border-destructive bg-destructive/10'
            }`}>
              <pre className="text-xs font-mono overflow-x-auto">
                {JSON.stringify(externalResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
