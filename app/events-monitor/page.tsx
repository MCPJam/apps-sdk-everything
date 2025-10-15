"use client";

import { useEffect, useState, useRef } from "react";
import { SET_GLOBALS_EVENT_TYPE, type SetGlobalsEvent, useIsChatGptApp } from "../hooks";

interface EventLog {
  id: string;
  timestamp: Date;
  globals: Record<string, unknown>;
  changedKeys: string[];
}

export default function EventsMonitor() {
  const [events, setEvents] = useState<EventLog[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const eventListRef = useRef<HTMLDivElement>(null);
  const isChatGptApp = useIsChatGptApp();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleSetGlobals = (event: SetGlobalsEvent) => {
      if (isPaused) return;

      const newEvent: EventLog = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        globals: event.detail.globals as Record<string, unknown>,
        changedKeys: Object.keys(event.detail.globals),
      };

      setEvents((prev) => [newEvent, ...prev].slice(0, 100)); // Keep last 100 events
    };

    window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobals as EventListener, {
      passive: true,
    });

    return () => {
      window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobals as EventListener);
    };
  }, [isPaused]);

  useEffect(() => {
    if (autoScroll && eventListRef.current) {
      eventListRef.current.scrollTop = 0;
    }
  }, [events, autoScroll]);

  const clearEvents = () => {
    setEvents([]);
  };

  const getEventTypeColor = (key: string) => {
    const colorMap: Record<string, string> = {
      theme: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200",
      displayMode: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
      maxHeight: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
      toolInput: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200",
      toolOutput: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200",
      widgetState: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200",
      locale: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200",
      userAgent: "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200",
      safeArea: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200",
    };
    return colorMap[key] || "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Events Monitor
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Live monitoring of <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">openai:set_globals</code> events
        </p>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ Not running in ChatGPT. Events may not fire.
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Status:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isPaused
                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                  : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
              }`}
            >
              {isPaused ? "⏸ Paused" : "▶ Recording"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Events:
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
              {events.length}
            </span>
          </div>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                autoScroll
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {autoScroll ? "Auto-scroll: ON" : "Auto-scroll: OFF"}
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isPaused
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-yellow-600 text-white hover:bg-yellow-700"
              }`}
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={clearEvents}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 bg-slate-50 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Event Log
          </h2>
        </div>
        <div
          ref={eventListRef}
          className="overflow-y-auto max-h-[600px]"
        >
          {events.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No events captured yet. Events will appear here as they occur.
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">
                Try changing display mode, theme, or interacting with the widget to trigger events.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {event.changedKeys.map((key) => (
                        <span
                          key={key}
                          className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(
                            key
                          )}`}
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-950 rounded p-3">
                    <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
                      {JSON.stringify(event.globals, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ℹ️ About openai:set_globals Events
        </h3>
        <ul className="text-sm text-blue-900 dark:text-blue-100 space-y-1 list-disc list-inside">
          <li>Events fire when window.openai global properties change</li>
          <li>Each event contains a partial update with only changed properties</li>
          <li>Use these events to reactively update your UI without polling</li>
          <li>The useOpenAIGlobal hook automatically subscribes to these events</li>
          <li>Events are batched and may contain multiple property changes</li>
        </ul>
      </div>
    </div>
  );
}
