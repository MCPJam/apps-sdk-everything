"use client";

import { useState, useEffect } from "react";

export default function WidgetCSPDemo() {
  const [githubStatus, setGithubStatus] = useState<"loading" | "success" | "blocked">("loading");
  const [randomSiteStatus, setRandomSiteStatus] = useState<"loading" | "success" | "blocked">("loading");

  useEffect(() => {
    // Try to fetch from allowed domain (api.github.com)
    fetch("https://api.github.com/zen")
      .then(() => setGithubStatus("success"))
      .catch(() => setGithubStatus("blocked"));

    // Try to fetch from non-allowed domain (should be blocked)
    fetch("https://api.example.com")
      .then(() => setRandomSiteStatus("success"))
      .catch(() => setRandomSiteStatus("blocked"));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800 mb-4">
        <h1 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
          🔒 widgetCSP Demo
        </h1>
        <p className="text-sm text-green-800 dark:text-green-200">
          CSP configured: <code className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded text-xs">connect_domains: ["api.github.com"]</code>
        </p>
      </div>

      <div className="space-y-3">
        {/* Allowed Domain Test */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-500">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">
              {githubStatus === "loading" && "⏳"}
              {githubStatus === "success" && "✅"}
              {githubStatus === "blocked" && "❌"}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">api.github.com (Allowed)</h3>
            </div>
          </div>
          <div className={`p-2 rounded text-xs ${
            githubStatus === "success"
              ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
              : githubStatus === "blocked"
              ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
              : "bg-slate-100 dark:bg-slate-900"
          }`}>
            {githubStatus === "loading" && "Testing..."}
            {githubStatus === "success" && "✅ Fetch succeeded - domain is whitelisted"}
            {githubStatus === "blocked" && "❌ CSP prevented this request"}
          </div>
        </div>

        {/* Blocked Domain Test */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-500">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">
              {randomSiteStatus === "loading" && "⏳"}
              {randomSiteStatus === "success" && "⚠️"}
              {randomSiteStatus === "blocked" && "🛡️"}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">api.example.com (Blocked)</h3>
            </div>
          </div>
          <div className={`p-2 rounded text-xs ${
            randomSiteStatus === "blocked"
              ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
              : randomSiteStatus === "success"
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100"
              : "bg-slate-100 dark:bg-slate-900"
          }`}>
            {randomSiteStatus === "loading" && "Testing..."}
            {randomSiteStatus === "blocked" && "🛡️ CSP blocked - not in whitelist (expected)"}
            {randomSiteStatus === "success" && "⚠️ Should have been blocked"}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          <strong>Result:</strong> Only whitelisted domains can be fetched. CSP provides security by blocking unauthorized requests.
        </p>
      </div>
    </div>
  );
}
