"use client";

import { useToolOutput } from '../../hooks/use-tool-output';

type TimeOutput = {
  timestamp: string;
  timezone: string;
  unixTimestamp: number;
};

export default function ReadOnlyWidget() {
  const output = useToolOutput<TimeOutput>();

  if (output === null) {
    return (
      <div className="w-full p-6 font-sans">
        <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <div className="text-6xl animate-pulse">⏳</div>
          <p>Loading time...</p>
        </div>
      </div>
    );
  }

  const date = new Date(output.timestamp);

  return (
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🕐</span>
          <h2 className="text-xl font-semibold">Current Time</h2>
        </div>

        <div className="text-center mb-6 py-4 border-t border-b border-white/20">
          <div className="text-5xl font-bold leading-none mb-2">{date.toLocaleTimeString()}</div>
          <div className="text-lg opacity-90">{date.toLocaleDateString()}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm p-2 bg-white/10 rounded-lg">
            <span className="font-semibold opacity-90">Timezone:</span>
            <span className="font-mono opacity-95">{output.timezone}</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 bg-white/10 rounded-lg">
            <span className="font-semibold opacity-90">ISO:</span>
            <span className="font-mono opacity-95 text-xs">{output.timestamp}</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 bg-white/10 rounded-lg">
            <span className="font-semibold opacity-90">Unix:</span>
            <span className="font-mono opacity-95">{output.unixTimestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
