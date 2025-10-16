"use client";

import { useState } from "react";
import {
  useTheme,
  useLocale,
  useUserAgent,
  useSafeArea,
  useDisplayMode,
  useMaxHeight,
  useToolInput,
  useToolOutput,
  useToolResponseMetadata,
  useWidgetState,
  useIsChatGptApp,
} from "../hooks";


function PropertyCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Property({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-sm text-slate-600 dark:text-slate-400 flex-shrink-0">
        {label}:
      </span>
      <span
        className={`text-sm text-slate-900 dark:text-slate-100 text-right ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function JsonValue({ data }: { data: unknown }) {
  if (data === null || data === undefined) {
    return (
      <span className="text-slate-400 dark:text-slate-500 italic">null</span>
    );
  }

  return (
    <pre className="text-xs bg-slate-100 dark:bg-slate-900 p-2 rounded overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function ApiDashboard() {
  const theme = useTheme();
  const locale = useLocale();
  const userAgent = useUserAgent();
  const safeArea = useSafeArea();
  const displayMode = useDisplayMode();
  const maxHeight = useMaxHeight();
  const toolInput = useToolInput();
  const toolOutput = useToolOutput();
  const toolResponseMetadata = useToolResponseMetadata();
  const isChatGptApp = useIsChatGptApp();

  const [widgetState] = useWidgetState(); // Just read, don't initialize with default

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          window.openai API Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Live view of all window.openai properties and their current values
        </p>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ Not running in ChatGPT. Some properties may be null.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual & Environment */}
        <PropertyCard title="Visual & Environment">
          <Property
            label="theme"
            value={
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  theme === "dark"
                    ? "bg-slate-800 text-slate-100"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {theme || "null"}
              </span>
            }
          />
          <Property label="locale" value={locale || "null"} mono />
        </PropertyCard>

        {/* User Agent */}
        <PropertyCard title="User Agent">
          <Property
            label="device.type"
            value={userAgent?.device.type || "null"}
            mono
          />
          <Property
            label="capabilities.hover"
            value={
              userAgent?.capabilities.hover !== undefined
                ? userAgent.capabilities.hover
                  ? "✓ true"
                  : "✗ false"
                : "null"
            }
          />
          <Property
            label="capabilities.touch"
            value={
              userAgent?.capabilities.touch !== undefined
                ? userAgent.capabilities.touch
                  ? "✓ true"
                  : "✗ false"
                : "null"
            }
          />
        </PropertyCard>

        {/* Layout */}
        <PropertyCard title="Layout">
          <Property
            label="displayMode"
            value={
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  displayMode === "fullscreen"
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200"
                    : displayMode === "pip"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                }`}
              >
                {displayMode || "null"}
              </span>
            }
          />
          <Property label="maxHeight" value={`${maxHeight}px` || "null"} mono />
        </PropertyCard>

        {/* Safe Area */}
        <PropertyCard title="Safe Area Insets">
          <Property
            label="top"
            value={safeArea?.insets.top !== undefined ? `${safeArea.insets.top}px` : "null"}
            mono
          />
          <Property
            label="bottom"
            value={safeArea?.insets.bottom !== undefined ? `${safeArea.insets.bottom}px` : "null"}
            mono
          />
          <Property
            label="left"
            value={safeArea?.insets.left !== undefined ? `${safeArea.insets.left}px` : "null"}
            mono
          />
          <Property
            label="right"
            value={safeArea?.insets.right !== undefined ? `${safeArea.insets.right}px` : "null"}
            mono
          />
        </PropertyCard>
      </div>
    </div>
  );
}
