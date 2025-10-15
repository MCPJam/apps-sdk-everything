"use client";

import { useIsChatGptApp } from "./hooks";

export default function Home() {
  const isChatGptApp = useIsChatGptApp();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          OpenAI Apps SDK Demo
        </h1>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ Not running in ChatGPT. Use the navigation above to explore demos.
            </p>
          </div>
        )}
        {isChatGptApp && (
          <div className="mt-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
            <p className="text-sm text-green-900 dark:text-green-100 font-medium">
              ✓ Running in ChatGPT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
