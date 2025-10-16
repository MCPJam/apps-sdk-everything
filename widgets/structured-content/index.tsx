import { createRoot } from 'react-dom/client';
import './index.css';
import { useToolOutput } from '../../app/hooks/use-tool-output';

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

function App() {
  const output = useToolOutput<SearchOutput>();

  if (output === null) {
    return (
      <div className="widget-container">
        <div className="loading-state">
          <div className="loading-spinner">🔍</div>
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  const categoryEmoji = {
    Electronics: '💻',
    Furniture: '🪑',
    Stationery: '📝',
  };

  return (
    <div className="widget-container">
      <div className="search-display">
        <div className="search-header">
          <span className="icon">🔍</span>
          <h2>Search Results</h2>
        </div>

        <div className="search-info">
          <div className="query-badge">
            <span className="query-label">Query:</span>
            <span className="query-value">"{output.query}"</span>
          </div>
          <div className="results-count">
            {output.totalResults} {output.totalResults === 1 ? 'result' : 'results'} found
          </div>
        </div>

        {output.items.length > 0 ? (
          <div className="items-grid">
            {output.items.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-icon">
                  {categoryEmoji[item.category as keyof typeof categoryEmoji] || '📦'}
                </div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-category">{item.category}</div>
                </div>
                <div className="item-price">${item.price}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <div className="no-results-text">No items found</div>
          </div>
        )}

        <div className="structured-badge">
          <span className="badge-icon">📊</span>
          <span className="badge-text">Structured Content Demo</span>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('structured-content-root')!).render(<App />);
