import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "read-only-widget",
  description: "A simple read-only widget displaying time data",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Loading time data...",
        invoked: "Time data loaded",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widgets/read-only");

  // this is missing the structured content to populate the widget

  return html;
}

