"use client";

import { useRequestDisplayMode } from '../../hooks/use-request-display-mode';
import { useDisplayMode } from '../../hooks/use-display-mode';
import { useState } from 'react';
import type { DisplayMode } from '../../hooks/types';

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
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-8 text-white shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📐</span>
          <h2 className="text-xl font-semibold">requestDisplayMode()</h2>
        </div>

        <p className="text-sm opacity-90 mb-6">
          Request layout transition between inline, PiP, and fullscreen modes
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-white/10 rounded-lg border-2 border-white/30">
            <p className="text-sm font-semibold mb-1">Current Display Mode:</p>
            <p className="text-lg font-mono">{currentDisplayMode || 'unknown'}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Request Mode:</label>
            <div className="grid grid-cols-3 gap-2">
              {(["inline", "pip", "fullscreen"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRequestedMode(mode)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    requestedMode === mode
                      ? "bg-white text-indigo-600 shadow-lg scale-105"
                      : "bg-white/20 hover:bg-white/30 border-2 border-white/30"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRequestDisplayMode}
            disabled={isLoading}
            className="w-full py-3 px-6 text-lg font-semibold bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {isLoading ? 'Requesting...' : 'Request Display Mode'}
          </button>

          {displayModeResult && (
            <div className={`p-4 rounded-lg border-2 ${
              !(displayModeResult as any).success
                ? 'bg-red-500/20 border-red-300/50'
                : 'bg-white/10 border-white/30'
            }`}>
              <p className="text-sm font-semibold mb-2">Result:</p>
              <pre className="text-xs font-mono">
                {JSON.stringify(displayModeResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
