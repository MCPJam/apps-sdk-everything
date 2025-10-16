"use client";

import { useCallTool } from '../../hooks/use-call-tool';
import { useState } from 'react';

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
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔧</span>
          <h2 className="text-xl font-semibold">callTool(name, args)</h2>
        </div>

        <p className="text-sm opacity-90 mb-6">
          Invoke MCP tools directly from the widget component
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Tool Name:</label>
            <select
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/50"
            >
              <option value="read_only_widget" className="text-gray-900">read_only_widget</option>
              <option value="input_calculation_widget" className="text-gray-900">input_calculation_widget</option>
              <option value="widget_accessible_tool" className="text-gray-900">widget_accessible_tool</option>
              <option value="tool_metadata_widget" className="text-gray-900">tool_metadata_widget</option>
              <option value="structured_content_widget" className="text-gray-900">structured_content_widget</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Arguments (JSON):</label>
            <textarea
              value={toolArgs}
              onChange={(e) => setToolArgs(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 font-mono text-sm focus:outline-none focus:border-white/50"
              placeholder='{"arg": "value"}'
            />
          </div>

          <button
            onClick={handleCallTool}
            disabled={isLoading}
            className="w-full py-3 px-6 text-lg font-semibold bg-white text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {isLoading ? 'Calling...' : 'Call Tool'}
          </button>

          {toolError && (
            <div className="p-4 bg-red-500/20 border-2 border-red-300/50 rounded-lg">
              <p className="text-sm font-semibold mb-1">Error:</p>
              <p className="text-sm font-mono">{toolError}</p>
            </div>
          )}

          {toolResult !== null && (
            <div className="p-4 bg-white/10 border-2 border-white/30 rounded-lg">
              <p className="text-sm font-semibold mb-2">Result:</p>
              <pre className="text-xs font-mono overflow-x-auto bg-black/20 p-3 rounded">
                {JSON.stringify(toolResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
