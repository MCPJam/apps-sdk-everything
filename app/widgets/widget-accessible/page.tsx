"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { useCallTool } from '../../hooks/use-call-tool';
import { useState } from 'react';

type CounterOutput = {
  counter: number;
  incrementAmount: number;
  timestamp: string;
};

export default function WidgetAccessibleTool() {
  const output = useToolOutput<CounterOutput>();
  const callTool = useCallTool();
  const [isIncrementing, setIsIncrementing] = useState(false);

  if (output === null) {
    return (
      <div className="w-full p-6 font-sans">
        <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <div className="text-6xl animate-spin">🔄</div>
          <p>Loading counter...</p>
        </div>
      </div>
    );
  }

  const handleIncrement = async (amount: number) => {
    if (!callTool) {
      console.error('callTool not available');
      return;
    }

    setIsIncrementing(true);
    try {
      await callTool('widget_accessible_tool', { amount });
    } catch (error) {
      console.error('Failed to increment:', error);
    } finally {
      setIsIncrementing(false);
    }
  };

  return (
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔢</span>
          <h2 className="text-xl font-semibold">Widget Accessible Tool Demo</h2>
        </div>

        <div className="text-center p-8 bg-white/15 rounded-xl mb-6">
          <div className="text-6xl font-bold leading-none mb-2">{output.counter}</div>
          <div className="text-sm opacity-90 uppercase tracking-wide">Current Counter Value</div>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            className="flex-1 py-3 px-6 text-lg font-semibold bg-white/20 border-2 border-white/30 rounded-lg hover:bg-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => handleIncrement(1)}
            disabled={isIncrementing}
          >
            {isIncrementing ? '...' : '+1'}
          </button>
          <button
            className="flex-1 py-3 px-6 text-lg font-semibold bg-white/20 border-2 border-white/30 rounded-lg hover:bg-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => handleIncrement(5)}
            disabled={isIncrementing}
          >
            {isIncrementing ? '...' : '+5'}
          </button>
          <button
            className="flex-1 py-3 px-6 text-lg font-semibold bg-white/20 border-2 border-white/30 rounded-lg hover:bg-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => handleIncrement(10)}
            disabled={isIncrementing}
          >
            {isIncrementing ? '...' : '+10'}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 p-3 bg-white/25 rounded-lg text-sm font-semibold border-2 border-white/30">
            <span>✨</span>
            <span>This widget can call the tool directly!</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
            <span className="font-semibold opacity-90">Last Increment:</span>
            <span className="font-mono opacity-95">{output.incrementAmount}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
            <span className="font-semibold opacity-90">Updated:</span>
            <span className="font-mono opacity-95">
              {new Date(output.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
