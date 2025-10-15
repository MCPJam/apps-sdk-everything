import { useOpenAIGlobal } from "./use-openai-global";
import type { UnknownObject } from "./types";

/**
 * Hook to get the structured output from the last tool execution.
 *
 * @returns The tool output object or null
 *
 * @example
 * ```tsx
 * const toolOutput = useToolOutput<{ data: string[]; count: number }>();
 * console.log(toolOutput?.data);
 * ```
 */
export function useToolOutput<T extends UnknownObject = UnknownObject>() {
  return useOpenAIGlobal("toolOutput") as T | null;
}
