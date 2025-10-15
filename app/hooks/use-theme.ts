import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get the current theme (light or dark mode).
 *
 * @returns "light" | "dark" | null
 *
 * @example
 * ```tsx
 * const theme = useTheme();
 * return <div className={theme === "dark" ? "dark-mode" : "light-mode"}>...</div>;
 * ```
 */
export function useTheme() {
  return useOpenAIGlobal("theme");
}
