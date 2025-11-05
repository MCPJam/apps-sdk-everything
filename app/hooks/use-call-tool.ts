import { useCallback } from "react";
import type { CallToolResponse, OpenAIGlobals, UnknownObject } from "./types";
import { SetGlobalsEvent } from "./types";

/**
 * Hook to call MCP (Model Context Protocol) tools directly from the widget.
 *
 * @returns A function to call tools with their name and arguments.
 *          Returns the tool response or null if not available.
 *
 * @example
 * ```tsx
 * const callTool = useCallTool();
 *
 * const handleFetchData = async () => {
 *   const result = await callTool("search_database", {
 *     query: "user data",
 *     limit: 10,
 *   });
 *   console.log(result?.structuredContent);
 * };
 * ```
 */
export function useCallTool() {
  const callTool = useCallback(
    async (
      name: string,
      args: Record<string, unknown>
    ): Promise<CallToolResponse | null> => {
      if (typeof window !== "undefined" && window?.openai?.callTool) {
        const response = await window.openai.callTool(name, args);

        const structuredContent = response?.structuredContent;
        const responseMetadata = response?._meta;

        if (structuredContent !== undefined || responseMetadata !== undefined) {
          const globalsUpdate: Partial<OpenAIGlobals> = {};

          if (structuredContent !== undefined) {
            const nextOutput =
              structuredContent === null
                ? null
                : (structuredContent as UnknownObject);
            globalsUpdate.toolOutput = nextOutput;
            if (window.openai) {
              window.openai.toolOutput = nextOutput;
            }
          }

          if (responseMetadata !== undefined) {
            const nextMetadata =
              responseMetadata === null
                ? null
                : (responseMetadata as UnknownObject);
            globalsUpdate.toolResponseMetadata = nextMetadata;
            if (window.openai) {
              window.openai.toolResponseMetadata = nextMetadata;
            }
          }

          if (Object.keys(globalsUpdate).length > 0) {
            window.dispatchEvent(new SetGlobalsEvent(globalsUpdate));
          }
        }

        return response;
      }
      return null;
    },
    []
  );

  return callTool;
}
