"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { useToolResponseMetadata } from '../../hooks/use-tool-response-metadata';

type WeatherOutput = {
  location: string;
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

type WeatherMetadata = {
  'custom/dataSource'?: string;
  'custom/cached'?: boolean;
  'custom/timestamp'?: string;
};

export default function ToolMetadataWidget() {
  const output = useToolOutput<WeatherOutput>();
  const metadata = useToolResponseMetadata() as WeatherMetadata | null;

  if (output === null) {
    return (
      <div className="w-full p-6 font-sans">
        <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <div className="text-6xl animate-pulse">🌤️</div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  const conditionEmoji = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    windy: '💨',
  };

  const emoji = conditionEmoji[output.condition as keyof typeof conditionEmoji] || '🌤️';

  return (
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-[#43e97b] to-[#38f9d7] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{emoji}</span>
          <h2 className="text-xl font-semibold">Weather in {output.location}</h2>
        </div>

        <div className="text-center p-8 bg-white/15 rounded-xl mb-6">
          <div className="text-6xl font-bold leading-none mb-2">{output.temperature}°C</div>
          <div className="text-2xl capitalize opacity-90">{output.condition}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/15 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💧</div>
            <div className="text-2xl font-bold mb-1">{output.humidity}%</div>
            <div className="text-sm opacity-90">Humidity</div>
          </div>
          <div className="bg-white/15 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💨</div>
            <div className="text-2xl font-bold mb-1">{output.windSpeed} km/h</div>
            <div className="text-sm opacity-90">Wind Speed</div>
          </div>
        </div>

        {metadata && (
          <div className="bg-black/15 rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/20">
              <span className="text-lg">📊</span>
              <span className="text-sm font-semibold uppercase tracking-wide">Tool Response Metadata (_meta)</span>
            </div>
            <div className="flex flex-col gap-2">
              {metadata['custom/dataSource'] && (
                <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
                  <span className="font-semibold opacity-90">Data Source:</span>
                  <span className="font-mono opacity-95">{metadata['custom/dataSource']}</span>
                </div>
              )}
              {metadata['custom/cached'] !== undefined && (
                <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
                  <span className="font-semibold opacity-90">Cached:</span>
                  <span className="font-mono opacity-95">
                    {metadata['custom/cached'] ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {metadata['custom/timestamp'] && (
                <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
                  <span className="font-semibold opacity-90">Timestamp:</span>
                  <span className="font-mono opacity-95 text-xs">
                    {new Date(metadata['custom/timestamp']).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
