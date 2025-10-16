import { createRoot } from 'react-dom/client';
import './index.css';
import { useToolOutput } from '../../app/hooks/use-tool-output';
import { useToolResponseMetadata } from '../../app/hooks/use-tool-response-metadata';

type WeatherOutput = {
  location: string;
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

type WeatherMetadata = {
  'custom/dataSource'?: string;
  'custom/cached'?: boolean;
  'custom/timestamp'?: string;
};

function App() {
  const output = useToolOutput<WeatherOutput>();
  const metadata = useToolResponseMetadata() as WeatherMetadata | null;

  if (output === null) {
    return (
      <div className="widget-container">
        <div className="loading-state">
          <div className="loading-spinner">🌤️</div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  const conditionEmoji = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    windy: '💨',
  };

  const emoji = conditionEmoji[output.condition as keyof typeof conditionEmoji] || '🌤️';

  return (
    <div className="widget-container">
      <div className="weather-display">
        <div className="weather-header">
          <span className="icon">{emoji}</span>
          <h2>Weather in {output.location}</h2>
        </div>

        <div className="weather-main">
          <div className="temperature">{output.temperature}°C</div>
          <div className="condition">{output.condition}</div>
        </div>

        <div className="weather-stats">
          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-value">{output.humidity}%</div>
            <div className="stat-label">Humidity</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💨</div>
            <div className="stat-value">{output.windSpeed} km/h</div>
            <div className="stat-label">Wind Speed</div>
          </div>
        </div>

        {metadata && (
          <div className="metadata-section">
            <div className="metadata-header">
              <span className="meta-icon">📊</span>
              <span className="meta-title">Tool Response Metadata (_meta)</span>
            </div>
            <div className="metadata-grid">
              {metadata['custom/dataSource'] && (
                <div className="metadata-item">
                  <span className="meta-label">Data Source:</span>
                  <span className="meta-value">{metadata['custom/dataSource']}</span>
                </div>
              )}
              {metadata['custom/cached'] !== undefined && (
                <div className="metadata-item">
                  <span className="meta-label">Cached:</span>
                  <span className="meta-value">
                    {metadata['custom/cached'] ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {metadata['custom/timestamp'] && (
                <div className="metadata-item">
                  <span className="meta-label">Timestamp:</span>
                  <span className="meta-value">
                    {new Date(metadata['custom/timestamp']).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById('tool-metadata-root')!).render(<App />);
