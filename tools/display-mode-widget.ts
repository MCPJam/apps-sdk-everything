
import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "display-mode-widget",
  description: "Shows how to use window.openai.requestDisplayMode() to change the display mode",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Requesting display mode...",
        invoked: "Display mode requested",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widgets/display-mode");

  return html;
}

