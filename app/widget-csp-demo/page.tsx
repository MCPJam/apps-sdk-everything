"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WidgetCSPDemo() {
  const [githubStatus, setGithubStatus] = useState<"loading" | "success" | "blocked">("loading");
  const [randomSiteStatus, setRandomSiteStatus] = useState<"loading" | "success" | "blocked">("loading");

  useEffect(() => {
    // Try to fetch from allowed domain (api.github.com)
    fetch("https://api.github.com/zen")
      .then(() => setGithubStatus("success"))
      .catch(() => setGithubStatus("blocked"));

    // Try to fetch from non-allowed domain (should be blocked)
    fetch("https://api.example.com")
      .then(() => setRandomSiteStatus("success"))
      .catch(() => setRandomSiteStatus("blocked"));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>widgetCSP</CardTitle>
          <CardDescription>
            CSP configured: <code className="bg-muted px-2 py-0.5 rounded text-xs">connect_domains: ["api.github.com"]</code>
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">api.github.com (Allowed)</CardTitle>
            <Badge variant={githubStatus === "success" ? "default" : githubStatus === "blocked" ? "destructive" : "secondary"}>
              {githubStatus === "loading" && "Testing"}
              {githubStatus === "success" && "Success"}
              {githubStatus === "blocked" && "Blocked"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`p-3 rounded-md text-xs ${
            githubStatus === "success"
              ? "bg-primary/10 text-primary"
              : githubStatus === "blocked"
              ? "bg-destructive/10 text-destructive"
              : "bg-muted"
          }`}>
            {githubStatus === "loading" && "Testing..."}
            {githubStatus === "success" && "Fetch succeeded - domain is whitelisted"}
            {githubStatus === "blocked" && "CSP prevented this request"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">api.example.com (Blocked)</CardTitle>
            <Badge variant={randomSiteStatus === "blocked" ? "default" : randomSiteStatus === "success" ? "destructive" : "secondary"}>
              {randomSiteStatus === "loading" && "Testing"}
              {randomSiteStatus === "success" && "Warning"}
              {randomSiteStatus === "blocked" && "Protected"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`p-3 rounded-md text-xs ${
            randomSiteStatus === "blocked"
              ? "bg-primary/10 text-primary"
              : randomSiteStatus === "success"
              ? "bg-destructive/10 text-destructive"
              : "bg-muted"
          }`}>
            {randomSiteStatus === "loading" && "Testing..."}
            {randomSiteStatus === "blocked" && "CSP blocked - not in whitelist (expected)"}
            {randomSiteStatus === "success" && "Should have been blocked"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Result:</span> Only whitelisted domains can be fetched. CSP provides security by blocking unauthorized requests.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
