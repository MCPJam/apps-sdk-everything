"use client";

import { useCallTool } from '../../hooks/use-call-tool';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CallToolWidget() {
  const callTool = useCallTool();
  const [toolName, setToolName] = useState("read_only_widget");
  const [toolArgs, setToolArgs] = useState("{}");
  const [toolResult, setToolResult] = useState<unknown>(null);
  const [toolError, setToolError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCallTool = async () => {
    setToolError(null);
    setToolResult(null);
    setIsLoading(true);
    try {
      const args = JSON.parse(toolArgs);
      const result = await callTool(toolName, args);
      setToolResult(result);
    } catch (error) {
      setToolError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>callTool(name, args)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tool</label>
            <Select value={toolName} onValueChange={setToolName}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read_only_widget">read_only_widget</SelectItem>
                <SelectItem value="input_calculation_widget">input_calculation_widget</SelectItem>
                <SelectItem value="widget_accessible_tool">widget_accessible_tool</SelectItem>
                <SelectItem value="tool_metadata_widget">tool_metadata_widget</SelectItem>
                <SelectItem value="structured_content_widget">structured_content_widget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Arguments</label>
            <Textarea
              value={toolArgs}
              onChange={(e) => setToolArgs(e.target.value)}
              rows={4}
              className="font-mono text-sm"
              placeholder='{"arg": "value"}'
            />
          </div>

          <Button onClick={handleCallTool} disabled={isLoading} className="w-full">
            {isLoading ? 'Calling...' : 'Call Tool'}
          </Button>

          {toolError && (
            <div className="p-3 border border-destructive bg-destructive/10 rounded-md">
              <p className="text-sm font-medium mb-1">Error</p>
              <p className="text-xs font-mono">{toolError}</p>
            </div>
          )}

          {toolResult !== null && (
            <div className="p-3 border rounded-md bg-muted">
              <p className="text-sm font-medium mb-2">Result</p>
              <pre className="text-xs font-mono overflow-x-auto">
                {JSON.stringify(toolResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
