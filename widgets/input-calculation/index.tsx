import { createRoot } from 'react-dom/client';
import './index.css';
import { useToolOutput } from '../../app/hooks/use-tool-output';
import { useToolInput } from '../../app/hooks/use-tool-input';

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

function App() {
  const input = useToolInput<CalculatorInput>();
  const output = useToolOutput<CalculatorOutput>();

  if (output === null || input === null) {
    return (
      <div className="widget-container">
        <div className="loading-state">
          <div className="loading-spinner">🔢</div>
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
    <div className="widget-container">
      <div className="calculator-display">
        <div className="calc-header">
          <span className="icon">{emoji}</span>
          <h2>Calculator Result</h2>
        </div>

        <div className="calc-main">
          <div className="equation">
            <span className="number">{output.operands.a}</span>
            <span className="operator">{symbol}</span>
            <span className="number">{output.operands.b}</span>
            <span className="equals">=</span>
            <span className="result">{output.result}</span>
          </div>
        </div>

        <div className="calc-details">
          <div className="detail-item">
            <span className="detail-label">Operation:</span>
            <span className="detail-value">{output.operation}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">First Number:</span>
            <span className="detail-value">{output.operands.a}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Second Number:</span>
            <span className="detail-value">{output.operands.b}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('input-calculation-root')!).render(<App />);
