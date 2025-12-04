import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "popover-widget",
  description: "Sample widget with a popover component for testing",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Opening popover widget...",
        invoked: "Popover widget opened",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widgets/popover");

  return html;
}