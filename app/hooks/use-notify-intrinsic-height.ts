import { useCallback } from "react";

/**
 * Hook to notify ChatGPT of the widget's intrinsic height.
 * Use this to report dynamic widget heights and avoid scroll clipping.
 * 
 * @returns A function to notify the host of the widget's height in pixels
 * 
 * @example
 * ```tsx
 * const notifyIntrinsicHeight = useNotifyIntrinsicHeight();
 * 
 * useEffect(() => {
 *   const height = containerRef.current?.scrollHeight ?? 0;
 *   notifyIntrinsicHeight(height);
 * }, [content]);
 * ```
 */
export function useNotifyIntrinsicHeight() {
  const notifyIntrinsicHeight = useCallback((height: number) => {
    if (typeof window !== "undefined" && window?.openai?.notifyIntrinsicHeight) {
      window.openai.notifyIntrinsicHeight(height);
    }
  }, []);

  return notifyIntrinsicHeight;
}