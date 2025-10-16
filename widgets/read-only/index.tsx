import { createRoot } from 'react-dom/client';
import './index.css';
import { useToolOutput } from '../../app/hooks/use-tool-output';

type TimeOutput = {
  timestamp: string;
  timezone: string;
  unixTimestamp: number;
};

function App() {
  const output = useToolOutput<TimeOutput>();

  if (output === null) {
    return (
      <div className="widget-container">
        <div className="loading-state">
          <div className="loading-spinner">⏳</div>
          <p>Loading time...</p>
        </div>
      </div>
    );
  }

  const date = new Date(output.timestamp);

  return (
    <div className="widget-container">
      <div className="time-display">
        <div className="time-header">
          <span className="icon">🕐</span>
          <h2>Current Time</h2>
        </div>

        <div className="time-main">
          <div className="time-value">{date.toLocaleTimeString()}</div>
          <div className="date-value">{date.toLocaleDateString()}</div>
        </div>

        <div className="time-details">
          <div className="detail-row">
            <span className="label">Timezone:</span>
            <span className="value">{output.timezone}</span>
          </div>
          <div className="detail-row">
            <span className="label">ISO:</span>
            <span className="value">{output.timestamp}</span>
          </div>
          <div className="detail-row">
            <span className="label">Unix:</span>
            <span className="value">{output.unixTimestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('read-only-root')!).render(<App />);
