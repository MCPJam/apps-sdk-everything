import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "show-apps-sdk-dashboard",
  description: "Displays the Apps SDK Dashboard",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Loading content...",
        invoked: "Content loaded",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");
  
  return html;
}

