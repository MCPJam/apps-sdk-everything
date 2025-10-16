import { createRoot } from 'react-dom/client';
import './index.css';
import { useToolOutput } from '../../app/hooks/use-tool-output';
import { useState } from 'react';

type CounterOutput = {
  counter: number;
  incrementAmount: number;
  timestamp: string;
};

function App() {
  const output = useToolOutput<CounterOutput>();
  const [isIncrementing, setIsIncrementing] = useState(false);

  if (output === null) {
    return (
      <div className="widget-container">
        <div className="loading-state">
          <div className="loading-spinner">🔄</div>
          <p>Loading counter...</p>
        </div>
      </div>
    );
  }

  const handleIncrement = async (amount: number) => {
    if (typeof window.openai?.callTool !== 'function') {
      console.error('callTool not available');
      return;
    }

    setIsIncrementing(true);
    try {
      await window.openai.callTool({
        name: 'widget_accessible_tool',
        arguments: { amount },
      });
    } catch (error) {
      console.error('Failed to increment:', error);
    } finally {
      setIsIncrementing(false);
    }
  };

  return (
    <div className="widget-container">
      <div className="counter-display">
        <div className="counter-header">
          <span className="icon">🔢</span>
          <h2>Widget Accessible Tool Demo</h2>
        </div>

        <div className="counter-main">
          <div className="counter-value">{output.counter}</div>
          <div className="counter-label">Current Counter Value</div>
        </div>

        <div className="counter-actions">
          <button
            className="counter-button"
            onClick={() => handleIncrement(1)}
            disabled={isIncrementing}
          >
            {isIncrementing ? '...' : '+1'}
          </button>
          <button
            className="counter-button"
            onClick={() => handleIncrement(5)}
            disabled={isIncrementing}
          >
            {isIncrementing ? '...' : '+5'}
          </button>
          <button
            className="counter-button"
            onClick={() => handleIncrement(10)}
            disabled={isIncrementing}
          >
            {isIncrementing ? '...' : '+10'}
          </button>
        </div>

        <div className="counter-info">
          <div className="info-badge">
            <span>✨</span>
            <span>This widget can call the tool directly!</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Increment:</span>
            <span className="info-value">{output.incrementAmount}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Updated:</span>
            <span className="info-value">
              {new Date(output.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('widget-accessible-root')!).render(<App />);
