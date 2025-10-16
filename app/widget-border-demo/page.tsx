"use client";

export default function WidgetBorderDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3">
          🖼️ widgetPrefersBorder Demo
        </h2>
        <p className="text-purple-800 dark:text-purple-200 mb-4">
          This widget has <code className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">openai/widgetPrefersBorder: true</code> set.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded p-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
            <strong>Purpose:</strong> Hints that this component should render inside a bordered card.
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Effect:</strong> ChatGPT will render this widget with a visible border for better visual separation.
          </p>
        </div>
      </div>
    </div>
  );
}
