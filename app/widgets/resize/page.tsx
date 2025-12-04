"use client";

import { useNotifyIntrinsicHeight } from '../../hooks/use-notify-intrinsic-height';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const PRESET_HEIGHTS = [200, 300, 400, 500, 600, 700, 800];

export default function ResizeWidget() {
  const [height, setHeight] = useState(400);
  const [lastChange, setLastChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const notifyIntrinsicHeight = useNotifyIntrinsicHeight();

  const handleHeightChange = async (newHeight: number) => {
    setLoading(true);
    setLastChange(newHeight - height);
    setHeight(newHeight);
    
    try {
      notifyIntrinsicHeight(newHeight);
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      setLoading(false);
    }
  };

  // Initialize with default height
  useEffect(() => {
    notifyIntrinsicHeight(height);
  }, []);

  return (
    <div className="flex flex-col p-8 bg-muted" style={{ minHeight: `${height}px` }}>
      {/* Main content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Height Display */}
        <div className="relative mb-12">
          <div className="text-7xl font-light tabular-nums tracking-tighter text-foreground">
            {height}
          </div>
          <div className="text-xl text-muted-foreground mt-2 text-center">px</div>
          {lastChange !== null && (
            <span
              className={`absolute -right-12 top-3 text-sm font-medium text-muted-foreground`}
            >
              {lastChange > 0 ? `+${lastChange}` : lastChange}
            </span>
          )}
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {PRESET_HEIGHTS.map((presetHeight) => (
            <Button
              key={presetHeight}
              variant={height === presetHeight ? "default" : "ghost"}
              size="sm"
              className="h-8"
              onClick={() => handleHeightChange(presetHeight)}
              disabled={loading}
            >
              {presetHeight}px
            </Button>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mt-8 text-xs text-muted-foreground flex items-center gap-2">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Updating size...
          </div>
        )}
      </div>
    </div>
  );
}