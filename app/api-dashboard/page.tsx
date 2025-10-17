"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex justify-between items-center gap-4 text-sm">
      <span className="text-muted-foreground flex-shrink-0">
        {label}
      </span>
      <span className={mono ? "font-mono text-xs" : ""}>
        {value}
      </span>
    </div>
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

  const [widgetState] = useWidgetState();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">
          window.openai API Dashboard
        </h1>
        <p className="text-muted-foreground">
          Live view of all window.openai properties and their current values
        </p>
        {!isChatGptApp && (
          <Card className="mt-4 border-destructive/50 bg-destructive/10">
            <CardContent className="pt-4">
              <p className="text-sm">
                Not running in ChatGPT. Some properties may be null.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Visual & Environment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Property
              label="theme"
              value={<Badge variant="secondary">{theme || "null"}</Badge>}
            />
            <Property label="locale" value={locale || "null"} mono />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Agent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Property
              label="device.type"
              value={userAgent?.device.type || "null"}
              mono
            />
            <Property
              label="capabilities.hover"
              value={
                userAgent?.capabilities.hover !== undefined
                  ? String(userAgent.capabilities.hover)
                  : "null"
              }
            />
            <Property
              label="capabilities.touch"
              value={
                userAgent?.capabilities.touch !== undefined
                  ? String(userAgent.capabilities.touch)
                  : "null"
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Property
              label="displayMode"
              value={<Badge variant="secondary">{displayMode || "null"}</Badge>}
            />
            <Property label="maxHeight" value={maxHeight ? `${maxHeight}px` : "null"} mono />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Safe Area Insets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
