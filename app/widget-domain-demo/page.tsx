"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WidgetDomainDemo() {
  const [currentDomain, setCurrentDomain] = useState<string>("");
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setCurrentDomain(window.location.origin);
    setIsIframe(window.self !== window.top);
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>widgetDomain</CardTitle>
          <CardDescription>Shows actual widget hosting origin</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Origin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-3 rounded-md">
            <p className="text-xs font-mono break-all">
              {currentDomain || "Loading..."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                {isIframe ? "Iframe" : "Standalone"}
              </CardTitle>
              <CardDescription className="mt-1">
                {isIframe ? "Running in ChatGPT" : "Not in ChatGPT"}
              </CardDescription>
            </div>
            <Badge variant={isIframe ? "default" : "secondary"}>
              {isIframe ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Note:</span> widgetDomain controls the iframe hosting origin. Default: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">web-sandbox.oaiusercontent.com</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
