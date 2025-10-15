"use client";

import { useState } from "react";
import {
  useCallTool,
  useSendMessage,
  useOpenExternal,
  useRequestDisplayMode,
  useWidgetState,
  useDisplayMode,
  useIsChatGptApp,
  type DisplayMode,
} from "../hooks";

function MethodCard({
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
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {description}
      </p>
      {children}
    </div>
  );
}

function ResultDisplay({ result }: { result: unknown }) {
  if (result === null || result === undefined) return null;

  return (
    <div className="mt-4 bg-slate-100 dark:bg-slate-900 rounded p-3">
      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
        Result:
      </p>
      <pre className="text-xs text-slate-900 dark:text-slate-100 overflow-x-auto">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default function MethodsPlayground() {
  const callTool = useCallTool();
  const sendMessage = useSendMessage();
  const openExternal = useOpenExternal();
  const requestDisplayMode = useRequestDisplayMode();
  const [widgetState, setWidgetState] = useWidgetState();
  const displayMode = useDisplayMode();
  const isChatGptApp = useIsChatGptApp();

  // State for callTool
  const [toolName, setToolName] = useState("get_time");
  const [toolArgs, setToolArgs] = useState("{}");
  const [toolResult, setToolResult] = useState<unknown>(null);
  const [toolError, setToolError] = useState<string | null>(null);

  // State for sendFollowUpMessage
  const [messagePrompt, setMessagePrompt] = useState(
    "Tell me more about the OpenAI Apps SDK"
  );
  const [messageResult, setMessageResult] = useState<unknown>(null);

  // State for openExternal
  const [externalUrl, setExternalUrl] = useState("https://developers.openai.com/apps-sdk");
  const [externalResult, setExternalResult] = useState<unknown>(null);

  // State for requestDisplayMode
  const [requestedMode, setRequestedMode] = useState<DisplayMode>("fullscreen");
  const [displayModeResult, setDisplayModeResult] = useState<unknown>(null);

  // State for setWidgetState
  const [stateJson, setStateJson] = useState(
    JSON.stringify({ counter: 0, data: "test" }, null, 2)
  );
  const [stateResult, setStateResult] = useState<unknown>(null);

  const handleCallTool = async () => {
    setToolError(null);
    setToolResult(null);
    try {
      const args = JSON.parse(toolArgs);
      const result = await callTool(toolName, args);
      setToolResult(result);
    } catch (error) {
      setToolError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleSendMessage = async () => {
    setMessageResult(null);
    try {
      await sendMessage(messagePrompt);
      setMessageResult({ success: true, message: "Message sent to conversation" });
    } catch (error) {
      setMessageResult({ success: false, error: String(error) });
    }
  };

  const handleOpenExternal = () => {
    setExternalResult(null);
    try {
      openExternal(externalUrl);
      setExternalResult({ success: true, message: "External link opened" });
    } catch (error) {
      setExternalResult({ success: false, error: String(error) });
    }
  };

  const handleRequestDisplayMode = async () => {
    setDisplayModeResult(null);
    try {
      const result = await requestDisplayMode(requestedMode);
      setDisplayModeResult(result);
    } catch (error) {
      setDisplayModeResult({ success: false, error: String(error) });
    }
  };

  const handleSetWidgetState = async () => {
    setStateResult(null);
    try {
      const state = JSON.parse(stateJson);
      setWidgetState(state);
      setStateResult({ success: true, message: "Widget state updated" });
    } catch (error) {
      setStateResult({ success: false, error: String(error) });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Methods Playground
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Interactive controls to test all window.openai methods
        </p>
        {!isChatGptApp && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ Not running in ChatGPT. Methods will not work as expected.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* callTool */}
        <MethodCard
          title="1. callTool(name, args)"
          description="Invoke MCP tools directly from the component"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tool Name:
              </label>
              <select
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                <option value="get_time">get_time</option>
                <option value="calculator">calculator</option>
                <option value="counter_increment">counter_increment</option>
                <option value="get_weather">get_weather</option>
                <option value="search_items">search_items</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Arguments (JSON):
              </label>
              <textarea
                value={toolArgs}
                onChange={(e) => setToolArgs(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md font-mono text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder='{"arg": "value"}'
              />
            </div>
            <button
              onClick={handleCallTool}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Call Tool
            </button>
            {toolError && (
              <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded text-sm text-red-900 dark:text-red-100">
                Error: {toolError}
              </div>
            )}
            <ResultDisplay result={toolResult} />
          </div>
        </MethodCard>

        {/* sendFollowUpMessage */}
        <MethodCard
          title="2. sendFollowUpMessage({ prompt })"
          description="Insert a message into the conversation thread"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Message:
              </label>
              <textarea
                value={messagePrompt}
                onChange={(e) => setMessagePrompt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder="Enter message to send..."
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
            >
              Send Message
            </button>
            <ResultDisplay result={messageResult} />
          </div>
        </MethodCard>

        {/* openExternal */}
        <MethodCard
          title="3. openExternal({ href })"
          description="Open external links or redirect pages/apps"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                URL:
              </label>
              <input
                type="text"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder="https://example.com"
              />
            </div>
            <button
              onClick={handleOpenExternal}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
            >
              Open External Link
            </button>
            <ResultDisplay result={externalResult} />
          </div>
        </MethodCard>

        {/* requestDisplayMode */}
        <MethodCard
          title="4. requestDisplayMode({ mode })"
          description={`Request layout transition. Current mode: ${displayMode}`}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Display Mode:
              </label>
              <div className="flex gap-2">
                {(["inline", "pip", "fullscreen"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setRequestedMode(mode)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      requestedMode === mode
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleRequestDisplayMode}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
            >
              Request Display Mode
            </button>
            <ResultDisplay result={displayModeResult} />
          </div>
        </MethodCard>

        {/* setWidgetState */}
        <MethodCard
          title="5. setWidgetState(state)"
          description="Persist component state (shown to the model, max ~4k tokens)"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                State (JSON):
              </label>
              <textarea
                value={stateJson}
                onChange={(e) => setStateJson(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md font-mono text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                placeholder='{"key": "value"}'
              />
            </div>
            <button
              onClick={handleSetWidgetState}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition-colors"
            >
              Set Widget State
            </button>
            <ResultDisplay result={stateResult} />
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Current Widget State:
              </p>
              <pre className="text-xs text-blue-900 dark:text-blue-100 overflow-x-auto">
                {JSON.stringify(widgetState, null, 2)}
              </pre>
            </div>
          </div>
        </MethodCard>
      </div>
    </div>
  );
}
