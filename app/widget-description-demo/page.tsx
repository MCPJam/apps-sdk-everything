"use client";

export default function WidgetDescriptionDemo() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mb-6">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-3">
          📝 Widget Description Demo
        </h1>
        <p className="text-blue-800 dark:text-blue-200">
          Demonstrates how widgetDescription provides context to the AI
        </p>
      </div>

      {/* What User Sees */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-blue-500 mb-4">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">👤</span>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What the User Sees</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">The visual widget content</p>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100">Weather Dashboard</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">San Francisco, CA</p>
            </div>
            <div className="text-5xl">☀️</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white dark:bg-slate-800 rounded p-3">
              <p className="text-2xl font-bold text-blue-600">72°F</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Temperature</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-3">
              <p className="text-2xl font-bold text-blue-600">65%</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Humidity</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-3">
              <p className="text-2xl font-bold text-blue-600">8mph</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Wind</p>
            </div>
          </div>
        </div>
      </div>

      {/* What AI Sees */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-green-500 mb-4">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">What the AI Sees (via widgetDescription)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Hidden metadata that provides context</p>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
          <p className="text-sm font-mono text-green-900 dark:text-green-100">
            "A minimal demo showing the widgetDescription _meta field - provides context to the AI about this widget's content"
          </p>
        </div>
      </div>

      {/* The Benefit */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-3">✨ The Benefit</h3>
        <div className="space-y-3 text-sm text-purple-800 dark:text-purple-200">
          <p>
            <strong>Without widgetDescription:</strong> The AI has to infer what the widget shows, potentially leading to redundant or inaccurate narration.
          </p>
          <p>
            <strong>With widgetDescription:</strong> The AI immediately understands the widget's purpose and content, allowing for more natural conversation without repetition.
          </p>
        </div>
      </div>
    </div>
  );
}
