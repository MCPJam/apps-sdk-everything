import { useOpenAIGlobal } from "./use-openai-global";

/**
 * Hook to get the user agent information including device type and capabilities.
 *
 * @returns UserAgent object with device type and capabilities (hover, touch) or null
 *
 * @example
 * ```tsx
 * const userAgent = useUserAgent();
 * console.log(userAgent?.device.type); // "desktop" | "mobile" | "tablet" | "unknown"
 * console.log(userAgent?.capabilities.hover); // true | false
 * console.log(userAgent?.capabilities.touch); // true | false
 * ```
 */
export function useUserAgent() {
  return useOpenAIGlobal("userAgent");
}
