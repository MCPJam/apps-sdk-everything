import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get the safe area insets for handling device notches and rounded corners.
 *
 * @returns SafeArea object with insets (top, bottom, left, right) or null
 *
 * @example
 * ```tsx
 * const safeArea = useSafeArea();
 * console.log(safeArea?.insets.top); // number
 * console.log(safeArea?.insets.bottom); // number
 *
 * // Use in styles
 * <div style={{ paddingTop: safeArea?.insets.top }}>
 *   Content that respects safe areas
 * </div>
 * ```
 */
export function useSafeArea() {
  return useOpenAIGlobal("safeArea");
}
