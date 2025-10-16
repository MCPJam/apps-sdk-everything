"use client";

import { useWidgetState } from '../../hooks/use-widget-state';
import { useState } from 'react';

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
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-8 text-white shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">💾</span>
          <h2 className="text-xl font-semibold">setWidgetState()</h2>
        </div>

        <p className="text-sm opacity-90 mb-6">
          Persist component state (shown to the model, max ~4k tokens)
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg border-2 border-white/30">
            <p className="text-sm font-semibold mb-2">Current Widget State:</p>
            <pre className="text-xs font-mono overflow-x-auto bg-black/20 p-3 rounded">
              {JSON.stringify(widgetState, null, 2)}
            </pre>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">New State (JSON):</label>
            <textarea
              value={stateJson}
              onChange={(e) => setStateJson(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 font-mono text-sm focus:outline-none focus:border-white/50"
              placeholder='{"key": "value"}'
            />
          </div>

          <button
            onClick={handleSetWidgetState}
            className="w-full py-3 px-6 text-lg font-semibold bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all active:scale-95"
          >
            Set Widget State
          </button>

          {error && (
            <div className="p-4 bg-red-500/20 border-2 border-red-300/50 rounded-lg">
              <p className="text-sm font-semibold mb-1">Error:</p>
              <p className="text-sm font-mono">{error}</p>
            </div>
          )}

          {stateResult !== null && !error && (
            <div className={`p-4 rounded-lg border-2 ${
              (stateResult as any).success
                ? 'bg-white/10 border-white/30'
                : 'bg-red-500/20 border-red-300/50'
            }`}>
              <pre className="text-sm font-mono">
                {JSON.stringify(stateResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
