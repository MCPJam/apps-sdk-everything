import { InferSchema, type ToolMetadata } from "xmcp";
import { z } from "zod";

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "increment",
  description:
    "Increments a counter. Can be called directly from the widget using window.openai.callTool()",
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Calling tool from widget...",
        invoked: "Tool call completed",
      },
      widgetAccessible: true,
      resultCanProduceWidget: true,
    },
  },
};

// Define tool parameters
export const schema = {
  counter: z.number().min(0).max(100).default(0),
  incrementAmount: z.number().min(0).max(100).default(0),
};

// Tool implementation
export default async function handler({
  counter,
  incrementAmount,
}: InferSchema<typeof schema>) {
  const amount = counter + incrementAmount;

  return {
    content: [
      {
        type: "text",
        text: `Counter incremented by ${incrementAmount}. New value: ${amount}`,
      },
    ],
    structuredContent: {
      counter: amount,
      incrementAmount,
      timestamp: new Date().toISOString(),
    },
    _meta: metadata._meta,
  };
}
