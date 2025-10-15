import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get the user's locale setting.
 *
 * @returns The user's locale (e.g., "en-US", "es-ES") or null if not available
 *
 * @example
 * ```tsx
 * const locale = useLocale();
 * console.log(locale); // "en-US"
 * ```
 */
export function useLocale() {
  return useOpenAIGlobal("locale");
}
