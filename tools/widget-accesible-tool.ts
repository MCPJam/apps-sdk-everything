import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "widget-accessible-tool",
  description: "A widget-accessible tool that increments a counter. Can be called directly from the widget using window.openai.callTool()",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Calling tool from widget...",
        invoked: "Tool call completed",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widgets/widget-accessible");
  
  return html;
}