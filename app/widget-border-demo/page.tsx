"use client";

export default function WidgetBorderDemo() {
  return (
    <div className="p-0 m-0 min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="p-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">🖼️ Border Effect Demo</h1>
          <p className="text-lg">This widget has <code className="bg-white/20 px-3 py-1 rounded">widgetPrefersBorder: true</code></p>
          <p className="text-sm mt-2 opacity-90">ChatGPT should render this with a visible border/card container</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/30">
          <p className="text-white text-center text-lg">
            ✅ If you see a border around this entire widget, widgetPrefersBorder is working!
          </p>
        </div>
      </div>
    </div>
  );
}
