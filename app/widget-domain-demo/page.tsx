"use client";

export default function WidgetDomainDemo() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
        <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-3">
          🌐 widgetDomain Demo
        </h2>
        <p className="text-orange-800 dark:text-orange-200 mb-4">
          This widget has <code className="bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">openai/widgetDomain</code> configured.
        </p>
        <div className="bg-white dark:bg-slate-800 rounded p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Purpose:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Specifies a custom origin for the hosted component.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Default:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">https://web-sandbox.oaiusercontent.com</code>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Effect:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Use this to host widgets on your own subdomain instead of the default sandbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
