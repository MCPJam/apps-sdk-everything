import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "show-widget-description-demo",
  description: "Demonstrates the openai/widgetDescription _meta field",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Loading description demo...",
        invoked: "Description demo loaded",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widget-description-demo");
  
  return html;
}