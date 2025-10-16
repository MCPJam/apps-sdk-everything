"use client";

export default function WidgetDescriptionDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-blue-50 dark:from-blue-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mb-4">
        <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
          📝 widgetDescription Demo
        </h1>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Provides hidden context to the AI about widget content
        </p>
      </div>

      {/* What User Sees */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-400 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">👤</span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">What User Sees</h3>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 rounded p-3 text-center">
          <p className="text-3xl mb-1">☀️</p>
          <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Weather: 72°F Sunny</p>
        </div>
      </div>

      {/* What AI Sees */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-400 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🤖</span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">What AI Sees (widgetDescription)</h3>
        </div>
        <div className="bg-green-50 dark:bg-green-950 rounded p-3">
          <p className="text-xs font-mono text-green-900 dark:text-green-100">
            "A minimal demo showing the widgetDescription _meta field"
          </p>
        </div>
      </div>

      {/* The Benefit */}
      <div className="bg-purple-50 dark:bg-purple-950 rounded p-3 border border-purple-200 dark:border-purple-800">
        <p className="text-xs text-purple-900 dark:text-purple-100">
          <strong>Benefit:</strong> The AI understands widget content without redundant narration, enabling more natural conversation.
        </p>
      </div>
    </div>
  );
}
