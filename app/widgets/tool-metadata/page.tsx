"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { useToolResponseMetadata } from '../../hooks/use-tool-response-metadata';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  // Use default values if no tool output available
  const defaultOutput: WeatherOutput = {
    location: "San Francisco",
    condition: "sunny",
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
  };

  const defaultMetadata: WeatherMetadata = {
    'custom/dataSource': 'mock-weather-api',
    'custom/cached': false,
    'custom/timestamp': new Date().toISOString(),
  };

  const weatherOutput = output || defaultOutput;
  const weatherMetadata = metadata || defaultMetadata;

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Tool Response Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-5xl font-semibold">{weatherOutput.temperature}°C</div>
            <div className="text-lg capitalize text-muted-foreground">{weatherOutput.condition}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 text-center space-y-2">
              <div className="text-2xl font-semibold">{weatherOutput.humidity}%</div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center space-y-2">
              <div className="text-2xl font-semibold">{weatherOutput.windSpeed} km/h</div>
              <div className="text-sm text-muted-foreground">Wind Speed</div>
            </div>
          </div>

          {weatherMetadata && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="text-sm font-medium">Response Metadata</div>
                {weatherMetadata['custom/dataSource'] && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Data Source</span>
                    <span className="font-mono">{weatherMetadata['custom/dataSource']}</span>
                  </div>
                )}
                {weatherMetadata['custom/cached'] !== undefined && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Cached</span>
                    <span className="font-mono">
                      {weatherMetadata['custom/cached'] ? 'Yes' : 'No'}
                    </span>
                  </div>
                )}
                {weatherMetadata['custom/timestamp'] && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Timestamp</span>
                    <span className="font-mono text-xs">
                      {new Date(weatherMetadata['custom/timestamp']).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
