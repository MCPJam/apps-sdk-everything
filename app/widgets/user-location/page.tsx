"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Clock } from "lucide-react";

type LocationOutput = {
  location: {
    city: string;
    region: string;
    country: string;
    timezone: string;
    coordinates: {
      latitude: number | null;
      longitude: number | null;
    };
  };
  locale: string;
  timestamp: string;
};

export default function UserLocationWidget() {
  const output = useToolOutput<LocationOutput>();

  // Use default values if no tool output available
  const defaultOutput: LocationOutput = {
    location: {
      city: "San Francisco",
      region: "California",
      country: "United States",
      timezone: "America/Los_Angeles",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    locale: "en-US",
    timestamp: new Date().toISOString(),
  };

  const locationData = output || defaultOutput;
  const { city, region, country, timezone, coordinates } = locationData.location;

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              User Location
            </CardTitle>
            <Badge variant="outline">{locationData.locale}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Location */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Location
              </div>
              <div className="text-2xl font-semibold">{city}</div>
              <div className="text-sm text-muted-foreground">
                {region}, {country}
              </div>
            </div>

            {/* Timezone */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timezone
              </div>
              <div className="text-lg font-mono">{timezone}</div>
            </div>

            {/* Coordinates */}
            {coordinates.latitude !== null && coordinates.longitude !== null && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="text-sm text-muted-foreground">Coordinates</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Latitude</div>
                    <div className="text-lg font-mono">{coordinates.latitude.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Longitude</div>
                    <div className="text-lg font-mono">{coordinates.longitude.toFixed(4)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Information Notice */}
          <div className="text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <strong>Note:</strong> This data is provided via the <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">openai/userLocation</code> metadata field.
            It should only be used for informational purposes and never for authorization decisions.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
