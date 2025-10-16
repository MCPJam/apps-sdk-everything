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

  // Tool 1: read_only_widget - Simple read-only tool
  const readOnlyHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/read-only");
  server.registerResource(
    "read-only-widget",
    "ui://widget/read-only.html",
    {
      title: "Read-Only Widget",
      description: "A simple read-only widget displaying time data",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Displays current time in various formats",
        "openai/widgetPrefersBorder": false,
      },
      annotations: { readOnlyHint: true }
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${readOnlyHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Displays current time in various formats",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "read_only_widget",
    {
      title: "Read-Only Widget Demo",
      description: "Demonstrates a simple read-only widget with time data",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/read-only.html",
        "openai/toolInvocation/invoking": "Loading time data...",
        "openai/toolInvocation/invoked": "Time data loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
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
        _meta: {
          "openai/outputTemplate": "ui://widget/read-only.html",
          "openai/toolInvocation/invoking": "Loading time data...",
          "openai/toolInvocation/invoked": "Time data loaded",
          "openai/widgetAccessible": false,
          "openai/resultCanProduceWidget": true,
        },
      };
    }
  );

  // Tool 2: input_calculation_widget - Takes input and performs calculations
  const calculatorHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/input-calculation");
  server.registerResource(
    "input-calculation-widget",
    "ui://widget/input-calculation.html",
    {
      title: "Input & Calculation Widget",
      description: "A widget that displays mathematical calculations",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Shows calculation results with input parameters",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${calculatorHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Shows calculation results with input parameters",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "input_calculation_widget",
    {
      title: "Input & Calculation Widget Demo",
      description: "Demonstrates a widget that takes user input and performs calculations",
      inputSchema: {
        operation: z.enum(["add", "subtract", "multiply", "divide"]).describe("The operation to perform"),
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/input-calculation.html",
        "openai/toolInvocation/invoking": "Calculating...",
        "openai/toolInvocation/invoked": "Calculation complete",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
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
        _meta: {
          "openai/outputTemplate": "ui://widget/input-calculation.html",
          "openai/toolInvocation/invoking": "Calculating...",
          "openai/toolInvocation/invoked": "Calculation complete",
          "openai/widgetAccessible": false,
          "openai/resultCanProduceWidget": true,
        },
      };
    }
  );

  // Tool 3: widget_accessible_tool - Widget accessible tool (can be called from component)
  const widgetAccessibleHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/widget-accessible");
  server.registerResource(
    "widget-accessible-tool",
    "ui://widget/widget-accessible.html",
    {
      title: "Widget Accessible Tool",
      description: "A widget that can call tools directly from within the component",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Interactive counter widget demonstrating widget-accessible tools",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetAccessibleHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Interactive counter widget demonstrating widget-accessible tools",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  let counter = 0;
  server.registerTool(
    "widget_accessible_tool",
    {
      title: "Widget Accessible Tool Demo",
      description: "Demonstrates a tool that can be called from within a widget component",
      inputSchema: {
        amount: z.number().optional().describe("Amount to increment by (default: 1)"),
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/widget-accessible.html",
        "openai/toolInvocation/invoking": "Incrementing counter...",
        "openai/toolInvocation/invoked": "Counter incremented",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true,
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
        _meta: {
          "openai/outputTemplate": "ui://widget/widget-accessible.html",
          "openai/toolInvocation/invoking": "Incrementing counter...",
          "openai/toolInvocation/invoked": "Counter incremented",
          "openai/widgetAccessible": true,
          "openai/resultCanProduceWidget": true,
        },
      };
    }
  );

  // Tool 4: tool_metadata_widget - Demonstrates toolResponseMetadata
  const toolMetadataHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/tool-metadata");
  server.registerResource(
    "tool-metadata-widget",
    "ui://widget/tool-metadata.html",
    {
      title: "Tool Metadata Widget",
      description: "A widget demonstrating tool response metadata usage",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Weather widget showing how to use _meta fields in tool responses",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${toolMetadataHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Weather widget showing how to use _meta fields in tool responses",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "tool_metadata_widget",
    {
      title: "Tool Metadata Widget Demo",
      description: "Demonstrates a widget using tool response metadata (_meta)",
      inputSchema: {
        location: z.string().describe("City name or location"),
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/tool-metadata.html",
        "openai/toolInvocation/invoking": "Fetching weather data...",
        "openai/toolInvocation/invoked": "Weather data loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
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
          "openai/outputTemplate": "ui://widget/tool-metadata.html",
          "openai/toolInvocation/invoking": "Fetching weather data...",
          "openai/toolInvocation/invoked": "Weather data loaded",
          "openai/widgetAccessible": false,
          "openai/resultCanProduceWidget": true,
          "custom/dataSource": "mock-weather-api",
          "custom/cached": false,
          "custom/timestamp": new Date().toISOString(),
        },
      };
    }
  );

  // Tool 5: structured_content_widget - Demonstrates structured content
  const structuredContentHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/structured-content");
  server.registerResource(
    "structured-content-widget",
    "ui://widget/structured-content.html",
    {
      title: "Structured Content Widget",
      description: "A widget displaying structured search results",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Search results widget demonstrating structured content display",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${structuredContentHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Search results widget demonstrating structured content display",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "structured_content_widget",
    {
      title: "Structured Content Widget Demo",
      description: "Demonstrates a widget displaying structured data",
      inputSchema: {
        query: z.string().describe("Search query"),
        limit: z.number().optional().describe("Maximum number of results (default: 5)"),
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/structured-content.html",
        "openai/toolInvocation/invoking": "Searching...",
        "openai/toolInvocation/invoked": "Search complete",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
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
        _meta: {
          "openai/outputTemplate": "ui://widget/structured-content.html",
          "openai/toolInvocation/invoking": "Searching...",
          "openai/toolInvocation/invoked": "Search complete",
          "openai/widgetAccessible": false,
          "openai/resultCanProduceWidget": true,
        },
      };
    }
  );

  // Method Demo Widgets
  // 1. Call Tool Demo
  const callToolHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/call-tool");
  server.registerResource(
    "call-tool-widget",
    "ui://widget/call-tool.html",
    {
      title: "Call Tool Method Demo",
      description: "Interactive widget for testing window.openai.callTool()",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Demonstrates calling MCP tools from within a widget",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${callToolHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Demonstrates calling MCP tools from within a widget",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "demo_call_tool",
    {
      title: "Demo: callTool() Method",
      description: "Shows how to use window.openai.callTool() to invoke MCP tools from widgets",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/call-tool.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    async () => ({
      content: [{ type: "text", text: "CallTool demo widget loaded" }],
      structuredContent: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/call-tool.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    })
  );

  // 2. Send Message Demo
  const sendMessageHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/send-message");
  server.registerResource(
    "send-message-widget",
    "ui://widget/send-message.html",
    {
      title: "Send Message Method Demo",
      description: "Interactive widget for testing window.openai.sendFollowUpMessage()",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Demonstrates sending messages to the conversation",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${sendMessageHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Demonstrates sending messages to the conversation",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "demo_send_message",
    {
      title: "Demo: sendFollowUpMessage() Method",
      description: "Shows how to use window.openai.sendFollowUpMessage() to add messages to the conversation",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/send-message.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    async () => ({
      content: [{ type: "text", text: "SendMessage demo widget loaded" }],
      structuredContent: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/send-message.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    })
  );

  // 3. Open External Demo
  const openExternalHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/open-external");
  server.registerResource(
    "open-external-widget",
    "ui://widget/open-external.html",
    {
      title: "Open External Method Demo",
      description: "Interactive widget for testing window.openai.openExternal()",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Demonstrates opening external links from widgets",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${openExternalHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Demonstrates opening external links from widgets",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "demo_open_external",
    {
      title: "Demo: openExternal() Method",
      description: "Shows how to use window.openai.openExternal() to open links outside the app",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/open-external.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    async () => ({
      content: [{ type: "text", text: "OpenExternal demo widget loaded" }],
      structuredContent: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/open-external.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    })
  );

  // 4. Display Mode Demo
  const displayModeHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/display-mode");
  server.registerResource(
    "display-mode-widget",
    "ui://widget/display-mode.html",
    {
      title: "Display Mode Method Demo",
      description: "Interactive widget for testing window.openai.requestDisplayMode()",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Demonstrates requesting different display modes",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${displayModeHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Demonstrates requesting different display modes",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "demo_display_mode",
    {
      title: "Demo: requestDisplayMode() Method",
      description: "Shows how to use window.openai.requestDisplayMode() to change widget layout",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/display-mode.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    async () => ({
      content: [{ type: "text", text: "DisplayMode demo widget loaded" }],
      structuredContent: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/display-mode.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    })
  );

  // 5. Widget State Demo
  const widgetStateHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/widget-state");
  server.registerResource(
    "widget-state-widget",
    "ui://widget/widget-state.html",
    {
      title: "Widget State Method Demo",
      description: "Interactive widget for testing window.openai.setWidgetState()",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Demonstrates persisting widget state",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetStateHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Demonstrates persisting widget state",
            "openai/widgetPrefersBorder": false,
          },
        },
      ],
    })
  );

  server.registerTool(
    "demo_widget_state",
    {
      title: "Demo: setWidgetState() Method",
      description: "Shows how to use window.openai.setWidgetState() to persist component state",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/widget-state.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    async () => {
      // Provide an initial empty state that ChatGPT will hydrate
      const initialState = {
        counter: 0,
        data: "test",
        timestamp: new Date().toISOString(),
      };

      return {
        content: [{ type: "text", text: "WidgetState demo widget loaded" }],
        structuredContent: {},
        _meta: {
          "openai/outputTemplate": "ui://widget/widget-state.html",
          "openai/toolInvocation/invoking": "Loading demo...",
          "openai/toolInvocation/invoked": "Demo loaded",
          "openai/widgetAccessible": false,
          "openai/resultCanProduceWidget": true,
          "openai/widgetState": initialState,
        },
      };
    }
  );

  // 1. Widget Description Demo
  const widgetDescHtml = await getAppsSdkCompatibleHtml(baseURL, "/widget-description-demo");
  const widgetDescWidget: ContentWidget = {
    id: "show_widget_description_demo",
    title: "widgetDescription Demo",
    templateUri: "ui://widget/description-demo.html",
    invoking: "Loading description demo...",
    invoked: "Description demo loaded",
    html: widgetDescHtml,
    description: "Demonstrates the openai/widgetDescription _meta field",
    widgetDomain: "https://nextjs.org/docs",
  };

  server.registerResource(
    "widget-description-demo",
    widgetDescWidget.templateUri,
    {
      title: widgetDescWidget.title,
      description: widgetDescWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "A minimal demo showing the widgetDescription _meta field - provides context to the AI about this widget's content",
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetDescWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": "A minimal demo showing the widgetDescription _meta field - provides context to the AI about this widget's content",
            "openai/widgetDomain": widgetDescWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    widgetDescWidget.id,
    {
      title: widgetDescWidget.title,
      description: "Show a minimal widget demonstrating the widgetDescription _meta field",
      inputSchema: {},
      _meta: widgetMeta(widgetDescWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "widgetDescription demo loaded",
          },
        ],
        _meta: widgetMeta(widgetDescWidget),
      };
    }
  );

  // 2. Widget Border Demo
  const widgetBorderHtml = await getAppsSdkCompatibleHtml(baseURL, "/widget-border-demo");
  const widgetBorderWidget: ContentWidget = {
    id: "show_widget_border_demo",
    title: "widgetPrefersBorder Demo",
    templateUri: "ui://widget/border-demo.html",
    invoking: "Loading border demo...",
    invoked: "Border demo loaded",
    html: widgetBorderHtml,
    description: "Demonstrates the openai/widgetPrefersBorder _meta field",
    widgetDomain: "https://nextjs.org/docs",
  };

  server.registerResource(
    "widget-border-demo",
    widgetBorderWidget.templateUri,
    {
      title: widgetBorderWidget.title,
      description: widgetBorderWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Minimal demo of widgetPrefersBorder - this widget should render with a border",
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetBorderWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": "Minimal demo of widgetPrefersBorder - this widget should render with a border",
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": widgetBorderWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    widgetBorderWidget.id,
    {
      title: widgetBorderWidget.title,
      description: "Show a minimal widget demonstrating the widgetPrefersBorder _meta field (renders with border)",
      inputSchema: {},
      _meta: widgetMeta(widgetBorderWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "widgetPrefersBorder demo loaded",
          },
        ],
        _meta: widgetMeta(widgetBorderWidget),
      };
    }
  );

  // 3. Widget CSP Demo
  const widgetCSPHtml = await getAppsSdkCompatibleHtml(baseURL, "/widget-csp-demo");
  const widgetCSPWidget: ContentWidget = {
    id: "show_widget_csp_demo",
    title: "widgetCSP Demo",
    templateUri: "ui://widget/csp-demo.html",
    invoking: "Loading CSP demo...",
    invoked: "CSP demo loaded",
    html: widgetCSPHtml,
    description: "Demonstrates the openai/widgetCSP _meta field with connect_domains and resource_domains",
    widgetDomain: "https://nextjs.org/docs",
  };

  server.registerResource(
    "widget-csp-demo",
    widgetCSPWidget.templateUri,
    {
      title: widgetCSPWidget.title,
      description: widgetCSPWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Minimal demo of widgetCSP showing Content Security Policy configuration with allowed domains",
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
          text: `<html>${widgetCSPWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": "Minimal demo of widgetCSP showing Content Security Policy configuration with allowed domains",
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": widgetCSPWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    widgetCSPWidget.id,
    {
      title: widgetCSPWidget.title,
      description: "Show a minimal widget demonstrating the widgetCSP _meta field with connect_domains and resource_domains",
      inputSchema: {},
      _meta: widgetMeta(widgetCSPWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "widgetCSP demo loaded",
          },
        ],
        _meta: widgetMeta(widgetCSPWidget),
      };
    }
  );

  // 4. Widget Domain Demo
  const widgetDomainHtml = await getAppsSdkCompatibleHtml(baseURL, "/widget-domain-demo");
  const widgetDomainWidget: ContentWidget = {
    id: "show_widget_domain_demo",
    title: "widgetDomain Demo",
    templateUri: "ui://widget/domain-demo.html",
    invoking: "Loading domain demo...",
    invoked: "Domain demo loaded",
    html: widgetDomainHtml,
    description: "Demonstrates the openai/widgetDomain _meta field for custom widget origins",
    widgetDomain: "https://nextjs.org/docs",
  };

  server.registerResource(
    "widget-domain-demo",
    widgetDomainWidget.templateUri,
    {
      title: widgetDomainWidget.title,
      description: widgetDomainWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Minimal demo of widgetDomain showing how to specify a custom origin for hosted components",
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetDomainWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": "Minimal demo of widgetDomain showing how to specify a custom origin for hosted components",
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": widgetDomainWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    widgetDomainWidget.id,
    {
      title: widgetDomainWidget.title,
      description: "Show a minimal widget demonstrating the widgetDomain _meta field for custom origins",
      inputSchema: {},
      _meta: widgetMeta(widgetDomainWidget),
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "widgetDomain demo loaded",
          },
        ],
        _meta: widgetMeta(widgetDomainWidget),
      };
    }
  );

  // 5. User Location Demo
  const userLocationHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/user-location");
  server.registerResource(
    "user-location-widget",
    "ui://widget/user-location.html",
    {
      title: "User Location Widget",
      description: "A widget that displays user location information from metadata",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Displays user location data including city, region, country, timezone, and coordinates",
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${userLocationHtml}</html>`,
          _meta: {
            "openai/widgetDescription": "Displays user location data including city, region, country, timezone, and coordinates",
            "openai/widgetPrefersBorder": true,
          },
        },
      ],
    })
  );

  server.registerTool(
    "user_location_demo",
    {
      title: "User Location Demo",
      description: "Demonstrates accessing user location metadata (city, region, country, timezone, coordinates)",
      inputSchema: {},
      _meta: {
        "openai/outputTemplate": "ui://widget/user-location.html",
        "openai/toolInvocation/invoking": "Fetching location data...",
        "openai/toolInvocation/invoked": "Location data loaded",
        "openai/widgetAccessible": false,
        "openai/resultCanProduceWidget": true,
      },
    },
    async (_args, { _meta }) => {
      // Access user location metadata
      const userLocation = _meta?.["openai/userLocation"] as {
        city?: string;
        region?: string;
        country?: string;
        timezone?: string;
        latitude?: number;
        longitude?: number;
      } | undefined;
      const locale = _meta?.["openai/locale"] ?? "en";

      // Extract location properties (with fallbacks for when data is unavailable)
      const city = userLocation?.city ?? "Unknown";
      const region = userLocation?.region ?? "Unknown";
      const country = userLocation?.country ?? "Unknown";
      const timezone = userLocation?.timezone ?? "Unknown";
      const latitude = userLocation?.latitude ?? null;
      const longitude = userLocation?.longitude ?? null;

      // Format location string
      const locationString = `${city}, ${region}, ${country}`;
      const coordinates = latitude && longitude
        ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        : "Not available";

      return {
        content: [
          {
            type: "text",
            text: `User location: ${locationString}\nTimezone: ${timezone}\nCoordinates: ${coordinates}\nLocale: ${locale}`,
          },
        ],
        structuredContent: {
          location: {
            city,
            region,
            country,
            timezone,
            coordinates: {
              latitude,
              longitude,
            },
          },
          locale,
          timestamp: new Date().toISOString(),
        },
        _meta: {
          "openai/outputTemplate": "ui://widget/user-location.html",
          "openai/toolInvocation/invoking": "Fetching location data...",
          "openai/toolInvocation/invoked": "Location data loaded",
          "openai/widgetAccessible": false,
          "openai/resultCanProduceWidget": true,
        },
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
