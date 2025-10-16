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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-orange-50 dark:from-orange-950 rounded-lg p-4 border border-orange-200 dark:border-orange-800 mb-4">
        <h1 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-2">
          🌐 widgetDomain Demo
        </h1>
        <p className="text-sm text-orange-800 dark:text-orange-200">
          Shows actual widget hosting origin
        </p>
      </div>

      <div className="space-y-3">
        {/* Current Domain Display */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-orange-400">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Current Origin</h3>
          <div className="bg-slate-100 dark:bg-slate-900 p-2 rounded">
            <p className="text-xs font-mono text-orange-600 dark:text-orange-400 break-all">
              {currentDomain || "Loading..."}
            </p>
          </div>
        </div>

        {/* Iframe Status */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-400">
          <div className="flex items-center gap-2">
            <span className="text-xl">{isIframe ? "✅" : "❌"}</span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {isIframe ? "Iframe" : "Standalone"}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isIframe ? "Running in ChatGPT" : "Not in ChatGPT"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          <strong>Note:</strong> widgetDomain controls the iframe hosting origin. Default: <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">web-sandbox.oaiusercontent.com</code>
        </p>
      </div>
    </div>
  );
}
