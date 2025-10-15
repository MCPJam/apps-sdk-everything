import { useOpenAIGlobal } from "./use-openai-global";
import type { UnknownObject } from "./types";

/**
 * Hook to get additional metadata from the last tool response.
 * This metadata is delivered only to the component and hidden from the model.
 *
 * @returns ToolResponseMetadata object or null if not available
 *
 * @example
 * ```tsx
 * const metadata = useToolResponseMetadata();
 * console.log(metadata?.["custom/field"]); // Access custom metadata
 * ```
 */
export function useToolResponseMetadata<T extends UnknownObject = UnknownObject>() {
  return useOpenAIGlobal("toolResponseMetadata") as T | null;
}
