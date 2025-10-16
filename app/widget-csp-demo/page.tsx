"use client";

export default function WidgetCSPDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-3">
          🔒 widgetCSP Demo
        </h2>
        <p className="text-green-800 dark:text-green-200 mb-4">
          This widget has <code className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">openai/widgetCSP</code> configured with connect_domains and resource_domains.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Purpose:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Controls which external resources this widget can access via Content Security Policy.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Configuration:</p>
            <pre className="text-xs bg-slate-100 dark:bg-slate-900 p-2 rounded mt-1 overflow-x-auto">
{`"connect_domains": ["api.github.com"]
"resource_domains": ["fonts.googleapis.com"]`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Effect:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This widget can fetch from api.github.com and load resources from fonts.googleapis.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
