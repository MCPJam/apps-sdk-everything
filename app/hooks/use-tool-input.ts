import { useOpenAIGlobal } from "./use-openai-global";
import type { UnknownObject } from "./types";

/**
 * Hook to get the input arguments passed to the current tool.
 *
 * @returns The tool input object or null
 *
 * @example
 * ```tsx
 * const toolInput = useToolInput<{ query: string; limit: number }>();
 * console.log(toolInput?.query);
 * ```
 */
export function useToolInput<T extends UnknownObject = UnknownObject>() {
  return useOpenAIGlobal("toolInput") as T | null;
}
