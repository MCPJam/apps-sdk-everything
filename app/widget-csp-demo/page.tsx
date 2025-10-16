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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border border-green-200 dark:border-green-800 mb-6">
        <h1 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-3">
          🔒 CSP (Content Security Policy) Demo
        </h1>
        <p className="text-green-800 dark:text-green-200">
          This widget has CSP configured with <code className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">connect_domains: ["api.github.com"]</code>
        </p>
      </div>

      <div className="space-y-4">
        {/* Allowed Domain Test */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-green-500">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">
              {githubStatus === "loading" && "⏳"}
              {githubStatus === "success" && "✅"}
              {githubStatus === "blocked" && "❌"}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Allowed Domain Test</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Fetching from api.github.com</p>
            </div>
          </div>
          <div className={`p-3 rounded ${
            githubStatus === "success"
              ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
              : githubStatus === "blocked"
              ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100"
              : "bg-slate-100 dark:bg-slate-900"
          }`}>
            {githubStatus === "loading" && "Testing..."}
            {githubStatus === "success" && "✅ SUCCESS: api.github.com is in connect_domains, fetch succeeded!"}
            {githubStatus === "blocked" && "❌ BLOCKED: CSP prevented this request"}
          </div>
        </div>

        {/* Blocked Domain Test */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-red-500">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">
              {randomSiteStatus === "loading" && "⏳"}
              {randomSiteStatus === "success" && "⚠️"}
              {randomSiteStatus === "blocked" && "🛡️"}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Blocked Domain Test</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Fetching from api.example.com</p>
            </div>
          </div>
          <div className={`p-3 rounded ${
            randomSiteStatus === "blocked"
              ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
              : randomSiteStatus === "success"
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100"
              : "bg-slate-100 dark:bg-slate-900"
          }`}>
            {randomSiteStatus === "loading" && "Testing..."}
            {randomSiteStatus === "blocked" && "🛡️ BLOCKED (Expected): api.example.com is NOT in connect_domains, CSP blocked it!"}
            {randomSiteStatus === "success" && "⚠️ WARNING: This domain should have been blocked by CSP"}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <strong>CSP Configuration:</strong> This widget can only fetch from api.github.com. All other domains are blocked by Content Security Policy.
        </p>
      </div>
    </div>
  );
}
