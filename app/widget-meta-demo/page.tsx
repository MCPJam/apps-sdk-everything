"use client";

import { useIsChatGptApp } from "../hooks";

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {description}
      </p>
      {children}
    </div>
  );
}

export default function WidgetMetaDemo() {
  const isChatGptApp = useIsChatGptApp();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Widget _meta Fields Demo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Demonstrates component resource _meta fields that control widget behavior in ChatGPT
        </p>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ Not running in ChatGPT. _meta field effects may not be visible.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Widget Description */}
        <DemoCard
          title="openai/widgetDescription"
          description="Human-readable summary surfaced to the model when the component loads"
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              This field provides context to the AI model about what the widget displays,
              reducing redundant narration.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Example:
              </p>
              <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
{`_meta: {
  "openai/widgetDescription": "Shows a weather dashboard with temperature and conditions"
}`}
              </pre>
            </div>
          </div>
        </DemoCard>

        {/* Widget Prefers Border */}
        <DemoCard
          title="openai/widgetPrefersBorder"
          description="Hint that the component should render inside a bordered card"
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Set to <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">true</code> when
              your widget benefits from visual separation. Set to{" "}
              <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">false</code> for
              full-bleed or immersive experiences.
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Example:
              </p>
              <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
{`_meta: {
  "openai/widgetPrefersBorder": true  // Render with border
}`}
              </pre>
            </div>
          </div>
        </DemoCard>

        {/* Widget CSP */}
        <DemoCard
          title="openai/widgetCSP"
          description="Define connect_domains and resource_domains for the component's CSP"
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Controls which external resources your widget can access. Use{" "}
              <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">connect_domains</code>{" "}
              for API calls and{" "}
              <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">resource_domains</code>{" "}
              for assets (fonts, images, stylesheets).
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Example:
              </p>
              <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
{`_meta: {
  "openai/widgetCSP": {
    "connect_domains": [
      "api.github.com",
      "api.example.com"
    ],
    "resource_domains": [
      "fonts.googleapis.com",
      "cdn.example.com"
    ]
  }
}`}
              </pre>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded">
              <p className="text-xs text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> Use specific domains instead of wildcards for better security.
                Only allow domains your widget actually needs.
              </p>
            </div>
          </div>
        </DemoCard>

        {/* Widget Domain */}
        <DemoCard
          title="openai/widgetDomain"
          description="Optional dedicated subdomain for hosted components"
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Specify a custom origin for your widget. Defaults to{" "}
              <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
                https://web-sandbox.oaiusercontent.com
              </code>
              .
            </p>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Example:
              </p>
              <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
{`_meta: {
  "openai/widgetDomain": "https://my-custom-domain.com"
}`}
              </pre>
            </div>
          </div>
        </DemoCard>

        {/* Complete Example */}
        <DemoCard
          title="Complete Example"
          description="All _meta fields together in a resource registration"
        >
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
            <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
{`server.registerResource(
  "weather-widget",
  "ui://widget/weather-template.html",
  {
    title: "Weather Widget",
    description: "Shows current weather conditions",
    mimeType: "text/html+skybridge",
    _meta: {
      "openai/widgetDescription": "Weather dashboard with temperature, conditions, and forecast",
      "openai/widgetPrefersBorder": true,
      "openai/widgetCSP": {
        "connect_domains": ["api.weather.com"],
        "resource_domains": ["cdn.weather.com"]
      },
      "openai/widgetDomain": "https://weather.example.com"
    }
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      mimeType: "text/html+skybridge",
      text: html,
      _meta: {
        "openai/widgetDescription": "Weather dashboard with temperature, conditions, and forecast",
        "openai/widgetPrefersBorder": true,
        "openai/widgetDomain": "https://weather.example.com"
      }
    }]
  })
);`}
            </pre>
          </div>
        </DemoCard>

        {/* Best Practices */}
        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            💡 Best Practices
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
            <li>Always provide a clear <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">widgetDescription</code> to help the model understand your widget</li>
            <li>Use <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">widgetPrefersBorder: true</code> for data-heavy widgets that need visual separation</li>
            <li>Be restrictive with CSP - only allow domains you actually use</li>
            <li>Set _meta fields consistently in both resource definition and contents</li>
            <li>Test your widgets in ChatGPT to verify _meta fields work as expected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
