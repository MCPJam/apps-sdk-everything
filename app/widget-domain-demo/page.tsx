"use client";

import { useState, useEffect } from "react";

export default function WidgetDomainDemo() {
  const [currentDomain, setCurrentDomain] = useState<string>("");
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setCurrentDomain(window.location.origin);
    setIsIframe(window.self !== window.top);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-lg p-6 border border-orange-200 dark:border-orange-800 mb-6">
        <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-3">
          🌐 Widget Domain Demo
        </h1>
        <p className="text-orange-800 dark:text-orange-200">
          Shows the actual origin where this widget is hosted
        </p>
      </div>

      <div className="space-y-4">
        {/* Current Domain Display */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-orange-500">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Current Widget Origin</h3>
          <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">window.location.origin:</p>
            <p className="text-lg font-mono text-orange-600 dark:text-orange-400 break-all">
              {currentDomain || "Loading..."}
            </p>
          </div>
        </div>

        {/* Iframe Status */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-blue-500">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Environment Check</h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isIframe ? "✅" : "❌"}</span>
            <div>
              <p className="text-slate-900 dark:text-slate-100">
                {isIframe ? "Running in iframe (ChatGPT environment)" : "Running standalone (not in ChatGPT)"}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isIframe ? "Widget is properly sandboxed" : "Open in ChatGPT to see sandbox domain"}
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-300 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">widgetDomain Configuration</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-600 dark:text-slate-400">Configured value:</p>
              <code className="text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                "openai/widgetDomain": "https://nextjs.org/docs"
              </code>
            </div>
            <div>
              <p className="text-slate-600 dark:text-slate-400">Default (if not set):</p>
              <code className="text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                https://web-sandbox.oaiusercontent.com
              </code>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>Note:</strong> The widgetDomain setting controls where the widget iframe is hosted. In ChatGPT, you'll see the actual sandbox domain above.
        </p>
      </div>
    </div>
  );
}
