"use client";

import Link from "next/link";
import { useIsChatGptApp } from "./hooks";

const demos = [
  {
    title: "API Dashboard",
    href: "/api-dashboard",
    description: "View all window.openai properties and their live values",
    icon: "📊",
    color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
  },
  {
    title: "Methods Playground",
    href: "/methods-playground",
    description: "Interactive controls to test all window.openai methods",
    icon: "🎮",
    color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700",
  },
  {
    title: "State Demo",
    href: "/state-demo",
    description: "Explore widget state persistence across lifecycles",
    icon: "💾",
    color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700",
  },
  {
    title: "Events Monitor",
    href: "/events-monitor",
    description: "Live monitoring of openai:set_globals events",
    icon: "📡",
    color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700",
  },
];

const tools = [
  { name: "get_time", description: "Simple read-only tool that returns current time" },
  { name: "calculator", description: "Performs basic mathematical calculations" },
  { name: "counter_increment", description: "Widget-accessible server-side counter" },
  { name: "get_weather", description: "Mock weather data with toolResponseMetadata" },
  { name: "search_items", description: "Search mock database with structured content" },
  { name: "show_apps_sdk_dashboard", description: "Original demo tool with widget rendering" },
];

export default function Home() {
  const isChatGptApp = useIsChatGptApp();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          OpenAI Apps SDK - Complete Demo
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          A comprehensive demonstration of all <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">window.openai</code> functionality
        </p>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-yellow-900 dark:text-yellow-100 font-medium">
                  ⚠️ Not running in ChatGPT - Some features may not work as expected
                </p>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  To see the full functionality, load this app in ChatGPT via an MCP server
                </p>
              </div>
            </div>
          </div>
        )}
        {isChatGptApp && (
          <div className="mt-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
            <p className="text-sm text-green-900 dark:text-green-100 font-medium">
              ✓ Running in ChatGPT - All features available!
            </p>
          </div>
        )}
      </div>

      {/* Demo Pages */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Interactive Demos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className={`${demo.color} border rounded-lg p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{demo.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {demo.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Coverage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            ✅ Properties Demonstrated
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">theme</code> - Light/dark mode detection
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">locale</code> - User locale settings
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">userAgent</code> - Device capabilities
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">safeArea</code> - Safe area insets
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">displayMode</code> - Layout mode
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">maxHeight</code> - Container constraints
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">toolInput/toolOutput</code> - Tool data
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">toolResponseMetadata</code> - Custom metadata
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">●</span>
              <code className="font-mono">widgetState</code> - Persistent state
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            ✅ Methods Demonstrated
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">●</span>
              <code className="font-mono">callTool()</code> - Direct tool invocation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">●</span>
              <code className="font-mono">sendFollowUpMessage()</code> - Send messages
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">●</span>
              <code className="font-mono">openExternal()</code> - Open links
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">●</span>
              <code className="font-mono">requestDisplayMode()</code> - Layout control
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">●</span>
              <code className="font-mono">setWidgetState()</code> - State persistence
            </li>
            <li className="flex items-center gap-2 mt-4">
              <span className="text-purple-600 dark:text-purple-400">●</span>
              <strong>Event:</strong> <code className="font-mono">openai:set_globals</code>
            </li>
          </ul>
        </div>
      </div>

      {/* MCP Tools */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
          🔧 Available MCP Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-3"
            >
              <code className="text-sm font-mono text-blue-600 dark:text-blue-400 font-semibold">
                {tool.name}
              </code>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          MCP Server endpoint: <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">/mcp</code>
        </p>
      </div>

      {/* Resources */}
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
          📚 Resources
        </h3>
        <div className="space-y-2">
          <a
            href="https://developers.openai.com/apps-sdk/reference"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            → OpenAI Apps SDK Reference
          </a>
          <a
            href="https://developers.openai.com/apps-sdk/build/custom-ux"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            → Building Custom UX Guide
          </a>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            → View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
