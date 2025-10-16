"use client";

import { useOpenExternal } from '../../hooks/use-open-external';
import { useState } from 'react';

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
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-white shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔗</span>
          <h2 className="text-xl font-semibold">openExternal()</h2>
        </div>

        <p className="text-sm opacity-90 mb-6">
          Open external links or redirect to other pages/apps
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">URL:</label>
            <input
              type="text"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              className="w-full px-4 py-3 border-2 border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/50"
              placeholder="https://example.com"
            />
          </div>

          <button
            onClick={handleOpenExternal}
            className="w-full py-3 px-6 text-lg font-semibold bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all active:scale-95"
          >
            Open External Link
          </button>

          {externalResult !== null && (
            <div className={`p-4 rounded-lg border-2 ${
              (externalResult as any).success
                ? 'bg-white/10 border-white/30'
                : 'bg-red-500/20 border-red-300/50'
            }`}>
              <pre className="text-sm font-mono">
                {JSON.stringify(externalResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
