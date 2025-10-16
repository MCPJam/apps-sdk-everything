"use client";

export default function WidgetBorderDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-6 border border-purple-200 dark:border-purple-800 mb-6">
        <h1 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
          🖼️ widgetPrefersBorder: true
        </h1>
        <p className="text-purple-800 dark:text-purple-200 text-sm">
          This widget has <code className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">widgetPrefersBorder: true</code> set in its _meta
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-dashed border-purple-300 dark:border-purple-700 mb-4">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">👀</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Look Around This Widget!</h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
          The <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">widgetPrefersBorder</code> hint tells ChatGPT to render this widget inside a bordered card container.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
          Check if there's a rounded border or card effect around this entire widget frame (not the dashed border you see here, but the outer container).
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 rounded p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          <strong>Note:</strong> The border is added by ChatGPT's UI, not by our CSS. It provides visual separation from other content in the conversation.
        </p>
      </div>
    </div>
  );
}
