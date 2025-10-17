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

  // Tool 2: widget_accessible_tool - Call tools from widget itself
  const widgetAccessibleHtml = await getAppsSdkCompatibleHtml(baseURL, "/widgets/widget-accessible");
  server.registerResource(
    "widget-accessible-tool",
    "ui://widget/widget-accessible.html",
    {
      title: "Call Tools from Widget",
      description: "Widget that calls MCP tools directly using window.openai.callTool()",
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": "Counter widget demonstrating how widgets can call tools directly with openai/widgetAccessible: true",
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
            "openai/widgetDescription": "Counter widget demonstrating how widgets can call tools directly with openai/widgetAccessible: true",
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
      title: "Call Tools from Widget Demo",
      description: "A widget-accessible tool that increments a counter. Can be called directly from the widget using window.openai.callTool()",
      inputSchema: {
        amount: z.number().optional().describe("Amount to increment by (default: 1)"),
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/widget-accessible.html",
        "openai/toolInvocation/invoking": "Calling tool from widget...",
        "openai/toolInvocation/invoked": "Tool call completed",
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
          "openai/toolInvocation/invoking": "Calling tool from widget...",
          "openai/toolInvocation/invoked": "Tool call completed",
          "openai/widgetAccessible": true,
          "openai/resultCanProduceWidget": true,
        },
      };
    }
  );

  // Method Demo Widgets
  // 1. Send Message Demo
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

  // Meta Field Demo Widgets
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
        "openai/widgetDescription": "Sales dashboard for Q4 2024 showing revenue $124.5K (↑12.3%), active users 8,432 (↑5.7%), and churn rate 2.4% (↑0.3%). Weekly activity trend is positive. This demo illustrates how widgetDescription provides concise context to the AI instead of verbose UI narration.",
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${widgetDescWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": "Sales dashboard for Q4 2024 showing revenue $124.5K (↑12.3%), active users 8,432 (↑5.7%), and churn rate 2.4% (↑0.3%). Weekly activity trend is positive. This demo illustrates how widgetDescription provides concise context to the AI instead of verbose UI narration.",
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

  // 2. Widget CSP Demo
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

});

export const GET = handler;
export const POST = handler;
