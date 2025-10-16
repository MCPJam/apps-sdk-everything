"use client";

import { useToolOutput } from '../../hooks/use-tool-output';

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
      <div className="w-full p-6 font-sans">
        <div className="flex flex-col items-center justify-center gap-4 min-h-[200px]">
          <div className="text-6xl animate-pulse">🔍</div>
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
    <div className="w-full p-6 font-sans">
      <div className="bg-gradient-to-br from-[#fa709a] to-[#fee140] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔍</span>
          <h2 className="text-xl font-semibold">Search Results</h2>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2 p-3 bg-white/20 rounded-lg border-2 border-white/30">
            <span className="text-sm font-semibold">Query:</span>
            <span className="font-mono font-semibold">"{output.query}"</span>
          </div>
          <div className="text-center text-sm font-semibold opacity-90">
            {output.totalResults} {output.totalResults === 1 ? 'result' : 'results'} found
          </div>
        </div>

        {output.items.length > 0 ? (
          <div className="flex flex-col gap-3 mb-4">
            {output.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white/15 rounded-xl border border-white/20 hover:bg-white/25 transition-all hover:-translate-y-0.5"
              >
                <div className="text-4xl flex-shrink-0">
                  {categoryEmoji[item.category as keyof typeof categoryEmoji] || '📦'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold mb-1">{item.name}</div>
                  <div className="text-xs opacity-90">{item.category}</div>
                </div>
                <div className="text-xl font-bold flex-shrink-0">${item.price}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12 bg-white/10 rounded-xl mb-4">
            <div className="text-5xl opacity-50">🔍</div>
            <div className="text-lg font-semibold opacity-80">No items found</div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 p-3 bg-black/15 rounded-lg text-sm font-semibold border border-white/20">
          <span className="text-lg">📊</span>
          <span className="uppercase tracking-wide">Structured Content Demo</span>
        </div>
      </div>
    </div>
  );
}
