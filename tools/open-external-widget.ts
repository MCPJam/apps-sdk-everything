import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "open-external-widget",
  description: "Shows how to use window.openai.openExternal() to open external links",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Opening external link...",
        invoked: "External link opened",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widgets/open-external");

  return html;
}

