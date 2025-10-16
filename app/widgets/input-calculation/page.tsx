"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { useToolInput } from '../../hooks/use-tool-input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CalculatorInput = {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  a: number;
  b: number;
};

type CalculatorOutput = {
  operation: string;
  operands: { a: number; b: number };
  result: number;
};

export default function InputCalculationWidget() {
  const input = useToolInput<CalculatorInput>();
  const output = useToolOutput<CalculatorOutput>();

  if (output === null || input === null) {
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

  // Validate output structure
  if (!output.operands || typeof output.result !== 'number') {
    return (
      <div className="w-full p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 text-destructive">
              <p>Invalid output format</p>
              <pre className="mt-4 text-xs">{JSON.stringify(output, null, 2)}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const operationSymbols = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷',
  };

  const symbol = operationSymbols[input.operation];

  return (
    <div className="w-full p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculation Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4 text-2xl font-semibold">
            <span className="px-4 py-2 bg-muted rounded-lg min-w-[3rem] text-center">{output.operands.a}</span>
            <span className="text-muted-foreground">{symbol}</span>
            <span className="px-4 py-2 bg-muted rounded-lg min-w-[3rem] text-center">{output.operands.b}</span>
            <span className="text-muted-foreground">=</span>
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg min-w-[3rem] text-center">{output.result}</span>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Operation</span>
              <span className="font-mono capitalize">{output.operation}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">First Number</span>
              <span className="font-mono">{output.operands.a}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Second Number</span>
              <span className="font-mono">{output.operands.b}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
