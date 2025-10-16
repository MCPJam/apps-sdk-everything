"use client";

export default function WidgetDescriptionDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">
          📝 widgetDescription Demo
        </h2>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          This widget has <code className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">openai/widgetDescription</code> set in its _meta fields.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded p-4">
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
            <strong>Purpose:</strong> Provides context to the AI about this widget's content, reducing redundant narration.
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Effect:</strong> The model knows this widget displays "A minimal demo showing the widgetDescription _meta field" without needing to describe it.
          </p>
        </div>
      </div>
    </div>
  );
}
