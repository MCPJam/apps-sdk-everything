"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type SearchItem = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type SearchOutput = {
  query: string;
  totalResults: number;
  items: SearchItem[];
};

export default function StructuredContentWidget() {
  const output = useToolOutput<SearchOutput>();

  if (output === null) {
    return (
      <div className="w-full p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              Loading...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Query: "{output.query}" · {output.totalResults} {output.totalResults === 1 ? 'result' : 'results'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {output.items.length > 0 ? (
            output.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="font-medium">{item.name}</div>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <div className="text-lg font-semibold flex-shrink-0">${item.price}</div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-muted-foreground">No items found</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
