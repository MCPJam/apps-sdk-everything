import { type ToolMetadata } from "xmcp";
import { baseURL } from "@/baseUrl";
import { getAppsSdkCompatibleHtml } from "@/lib/utils";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "send-message-widget",
  description: "Shows how to use window.openai.sendFollowUpMessage() to add messages to the conversation",
  _meta: {  
    openai: {
      toolInvocation: {
        invoking: "Sending message...",
        invoked: "Message sent",
      },
    },
  },
};

// Tool implementation
export default async function handler() {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/widgets/send-message");

  return html;
}

