import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
  widgetDomain: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const handler = createMcpHandler(async (server) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");

  const contentWidget: ContentWidget = {
    id: "show_apps_sdk_dashboard",
    title: "Show Apps SDK Dashboard",
    templateUri: "ui://widget/content-template.html",
    invoking: "Loading content...",
    invoked: "Content loaded",
    html: html,
    description: "Displays the Apps SDK Dashboard",
    widgetDomain: "https://nextjs.org/docs",
  };
  server.registerResource(
    "content-widget",
    contentWidget.templateUri,
    {
      title: contentWidget.title,
      description: contentWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": contentWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${contentWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": contentWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": contentWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description:
        "Fetch and display the homepage content with the name of the user",
      inputSchema: {
        name: z.string().describe("The name of the user to display on the homepage"),
      },
      _meta: widgetMeta(contentWidget),
    },
    async ({ name }) => {
      return {
        content: [
          {
            type: "text",
            text: name,
          },
        ],
        structuredContent: {
          name: name,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(contentWidget),
      };
    }
  );

  // Tool 1: get_time - Simple read-only tool
  server.registerTool(
    "get_time",
    {
      title: "Get Current Time",
      description: "Returns the current server time in ISO format",
      inputSchema: {},
    },
    async () => {
      const now = new Date();
      return {
        content: [
          {
            type: "text",
            text: `Current time: ${now.toISOString()}`,
          },
        ],
        structuredContent: {
          timestamp: now.toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          unixTimestamp: now.getTime(),
        },
      };
    }
  );

  // Tool 2: calculator - Takes input and performs calculations
  server.registerTool(
    "calculator",
    {
      title: "Calculator",
      description: "Performs basic mathematical calculations",
      inputSchema: {
        operation: z.enum(["add", "subtract", "multiply", "divide"]).describe("The operation to perform"),
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
      },
    },
    async ({ operation, a, b }) => {
      let result: number;
      switch (operation) {
        case "add":
          result = a + b;
          break;
        case "subtract":
          result = a - b;
          break;
        case "multiply":
          result = a * b;
          break;
        case "divide":
          if (b === 0) {
            return {
              content: [
                {
                  type: "text",
                  text: "Error: Division by zero",
                },
              ],
              isError: true,
            };
          }
          result = a / b;
          break;
      }

      return {
        content: [
          {
            type: "text",
            text: `${a} ${operation} ${b} = ${result}`,
          },
        ],
        structuredContent: {
          operation,
          operands: { a, b },
          result,
        },
      };
    }
  );

  // Tool 3: counter_increment - Widget accessible tool (can be called from component)
  let counter = 0;
  server.registerTool(
    "counter_increment",
    {
      title: "Increment Counter",
      description: "Increments a server-side counter (widget accessible)",
      inputSchema: {
        amount: z.number().optional().describe("Amount to increment by (default: 1)"),
      },
      _meta: {
        "openai/widgetAccessible": true,
      },
    },
    async ({ amount = 1 }) => {
      counter += amount;
      return {
        content: [
          {
            type: "text",
            text: `Counter incremented by ${amount}. New value: ${counter}`,
          },
        ],
        structuredContent: {
          counter,
          incrementAmount: amount,
          timestamp: new Date().toISOString(),
        },
      };
    }
  );

  // Tool 4: get_weather - Demonstrates toolResponseMetadata
  server.registerTool(
    "get_weather",
    {
      title: "Get Weather",
      description: "Returns mock weather data for a location",
      inputSchema: {
        location: z.string().describe("City name or location"),
      },
    },
    async ({ location }) => {
      const weatherConditions = ["sunny", "cloudy", "rainy", "snowy", "windy"];
      const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const temperature = Math.floor(Math.random() * 40) - 5; // -5 to 35°C

      return {
        content: [
          {
            type: "text",
            text: `Weather in ${location}: ${randomCondition}, ${temperature}°C`,
          },
        ],
        structuredContent: {
          location,
          condition: randomCondition,
          temperature,
          humidity: Math.floor(Math.random() * 100),
          windSpeed: Math.floor(Math.random() * 50),
        },
        _meta: {
          "custom/dataSource": "mock-weather-api",
          "custom/cached": false,
          "custom/timestamp": new Date().toISOString(),
        },
      };
    }
  );

  // Tool 5: search_items - Demonstrates structured content
  server.registerTool(
    "search_items",
    {
      title: "Search Items",
      description: "Search through a mock database of items",
      inputSchema: {
        query: z.string().describe("Search query"),
        limit: z.number().optional().describe("Maximum number of results (default: 5)"),
      },
    },
    async ({ query, limit = 5 }) => {
      const mockItems = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999 },
        { id: 2, name: "Mouse", category: "Electronics", price: 29 },
        { id: 3, name: "Keyboard", category: "Electronics", price: 79 },
        { id: 4, name: "Desk Chair", category: "Furniture", price: 299 },
        { id: 5, name: "Monitor", category: "Electronics", price: 399 },
        { id: 6, name: "Headphones", category: "Electronics", price: 149 },
        { id: 7, name: "Desk Lamp", category: "Furniture", price: 49 },
        { id: 8, name: "Notebook", category: "Stationery", price: 5 },
      ];

      const results = mockItems
        .filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, limit);

      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} items matching "${query}"`,
          },
        ],
        structuredContent: {
          query,
          totalResults: results.length,
          items: results,
        },
      };
    }
  );

  // Widget Meta Demo - Demonstrates _meta field configurations
  const widgetMetaHtml = await getAppsSdkCompatibleHtml(baseURL, "/widget-meta-demo");
  const widgetMetaWidget: ContentWidget = {
    id: "show_widget_meta_demo",
    title: "Widget _meta Fields Demo",
    templateUri: "ui://widget/meta-demo.html",
    invoking: "Loading _meta fields demo...",
    invoked: "_meta fields demo loaded",
    html: widgetMetaHtml,
    description: "Educational widget demonstrating component resource _meta field configurations",
    widgetDomain: "https://nextjs.org/docs",
  };

  server.registerResource(
    "widget-meta-demo",
    widgetMetaWidget.templateUri,
    {
      title: widgetMetaWidget.title,
      description: widgetMetaWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Interactive documentation showing how to use _meta fields like widgetDescription, widgetPrefersBorder, widgetCSP, and widgetDomain to control widget behavior in ChatGPT",
        "openai/widgetPrefersBorder": true,
        "openai/widgetCSP": {
          "connect_domains": [
            "api.github.com"
          ],
          "resource_domains": [
            "fonts.googleapis.com"
          ]
        },
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetMetaWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": "Interactive documentation showing how to use _meta fields like widgetDescription, widgetPrefersBorder, widgetCSP, and widgetDomain to control widget behavior in ChatGPT",
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": widgetMetaWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    widgetMetaWidget.id,
    {
      title: widgetMetaWidget.title,
      description: "Display an educational widget about component resource _meta fields and their usage",
      inputSchema: {},
      _meta: widgetMeta(widgetMetaWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "Widget _meta fields demo loaded. This widget demonstrates the different _meta configurations available for ChatGPT components.",
          },
        ],
        _meta: widgetMeta(widgetMetaWidget),
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
