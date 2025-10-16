"use client";

import { useToolOutput } from '../../hooks/use-tool-output';
import { useToolInput } from '../../hooks/use-tool-input';

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
      <div className="w-full p-6 font-sans">
        <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <div className="text-6xl animate-pulse">🔢</div>
          <p>Calculating...</p>
        </div>
      </div>
    );
  }

  const operationSymbols = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷',
  };

  const operationEmoji = {
    add: '➕',
    subtract: '➖',
    multiply: '✖️',
    divide: '➗',
  };

  const symbol = operationSymbols[input.operation];
  const emoji = operationEmoji[input.operation];

  return (
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{emoji}</span>
          <h2 className="text-xl font-semibold">Calculator Result</h2>
        </div>

        <div className="p-8 bg-white/15 rounded-xl mb-6">
          <div className="flex items-center justify-center gap-4 text-3xl font-bold flex-wrap">
            <span className="bg-white/20 px-4 py-2 rounded-lg min-w-[3rem] text-center">{output.operands.a}</span>
            <span className="text-4xl opacity-90">{symbol}</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg min-w-[3rem] text-center">{output.operands.b}</span>
            <span className="text-4xl opacity-90">=</span>
            <span className="bg-white/30 px-4 py-2 rounded-lg min-w-[3rem] text-center border-2 border-white/40">{output.result}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
            <span className="font-semibold opacity-90">Operation:</span>
            <span className="font-mono opacity-95 capitalize">{output.operation}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
            <span className="font-semibold opacity-90">First Number:</span>
            <span className="font-mono opacity-95">{output.operands.a}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm">
            <span className="font-semibold opacity-90">Second Number:</span>
            <span className="font-mono opacity-95">{output.operands.b}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
