# ChatGPT Apps SDK Next.js Starter

A comprehensive reference implementation demonstrating how to build custom ChatGPT applications using the OpenAI Apps SDK, Model Context Protocol, and Next.js. This project serves as both a working foundation and an interactive gallery of widget patterns showcasing the complete capabilities of the SDK.

## What This Project Does

This starter enables you to build custom applications that extend ChatGPT by:

1. **Exposing tools** that ChatGPT can intelligently invoke during conversations
2. **Rendering rich, interactive React components** directly within ChatGPT
3. **Creating bidirectional communication** between your widgets and the AI model
4. **Persisting state** across conversation sessions
5. **Integrating external data sources** and APIs into ChatGPT workflows

Think of it as building mini-applications that live inside ChatGPT—where the model decides when to invoke your functionality, and your UI handles the presentation and interaction.

## Architecture Overview

ChatGPT apps are built on a three-layer architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Your MCP Server                       │
│  (Registers tools, handles requests, serves resources)  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    ChatGPT Runtime                       │
│    (Orchestrates tool calls, fetches resources)         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    Your Widget                           │
│  (React component with window.openai bridge access)     │
└─────────────────────────────────────────────────────────┘
```

### Request Flow

1. User interacts with ChatGPT
2. ChatGPT decides to invoke your tool
3. Your MCP server returns structured data and a widget reference
4. ChatGPT fetches your widget HTML and renders it in a sandboxed iframe
5. Widget receives data via `window.openai` and presents it visually
6. Widget can call tools, send messages, or update state back through the bridge

## Core Concepts

### Model Context Protocol (MCP)

MCP is the standard protocol for exposing tools and resources to AI models. Your server implements MCP endpoints that:

- **Register tools** with input/output schemas and metadata
- **Register resources** (HTML pages containing your widgets)
- **Handle tool invocations** and return structured responses
- **Control data visibility** (what the model sees vs. what the widget sees)

### The window.openai Bridge

When your React widget renders inside ChatGPT, it gains access to a powerful API for bidirectional communication:

**Methods:**
- `callTool(name, params)` - Invoke MCP tools from your widget
- `sendFollowUpMessage(text)` - Insert messages into the conversation
- `requestDisplayMode(mode)` - Change layout (inline, picture-in-picture, fullscreen)
- `setWidgetState(state)` - Persist component state across sessions
- `openExternal(url)` - Navigate to external URLs

**Reactive Properties:**
- `theme` - ChatGPT's current theme (light/dark)
- `locale` - User's language preference
- `displayMode` - Current layout mode
- `toolOutput` - Structured data from tool responses
- `widgetState` - Persisted component state

### Metadata System

OpenAI extends standard MCP with specialized metadata fields that control behavior:

**Tool Metadata** (`_meta` in tool descriptors):
- `openai/outputTemplate` - Links tool to widget resource URI
- `openai/widgetAccessible` - Enables widget-to-tool communication
- `openai/toolInvocation/invoking` - Loading state text (≤64 chars)
- `openai/toolInvocation/invoked` - Completion state text (≤64 chars)

**Resource Metadata** (`_meta` in resource descriptors):
- `openai/widgetDescription` - Human-readable widget summary
- `openai/widgetPrefersBorder` - UI rendering hint
- `openai/widgetCSP` - Content Security Policy configuration
- `openai/widgetDomain` - Optional dedicated subdomain

### Data Visibility Control

Tool responses support three fields with different visibility scopes:

```typescript
{
  structuredContent: { /* ... */ },  // Visible to: Model + Widget
  content: "Human readable text",     // Visible to: Model + Transcript
  _meta: { /* ... */ }                // Visible to: Widget only
}
```

This separation allows you to:
- Share data with both the model and your widget via `structuredContent`
- Provide narrative context in the transcript via `content`
- Pass widget-specific metadata (API keys, debug info) via `_meta`

## Project Structure

```
app/
├── mcp/
│   └── route.ts           # MCP server - registers tools and resources
├── widgets/
│   ├── read-only/         # Simple data display widget
│   ├── widget-accessible/ # Interactive counter using callTool()
│   ├── send-message/      # Message injection example
│   ├── open-external/     # External link handling
│   ├── display-mode/      # Layout mode transitions
│   └── widget-state/      # State persistence example
├── hooks/
│   ├── use-tool-output.ts     # Access tool response data
│   ├── use-call-tool.ts       # Call tools from widgets
│   ├── use-send-message.ts    # Send follow-up messages
│   ├── use-widget-state.ts    # Persist component state
│   ├── use-display-mode.ts    # React to layout changes
│   └── ...                    # Additional hooks wrapping window.openai
├── components/
│   └── ui/                # Radix UI + Tailwind components
├── layout.tsx             # Root layout with SDK bootstrap
└── page.tsx               # Home page

middleware.ts              # CORS handling for RSC fetching
next.config.ts            # Asset prefix configuration
baseUrl.ts                # Environment-aware URL detection
```

## Key Implementation Details

### 1. MCP Server Route (`app/mcp/route.ts`)

The heart of your application. This 600+ line file demonstrates:

- Tool registration with OpenAI-specific metadata
- Resource registration linking to widget HTML
- Tool handlers that process requests and return structured data
- Response field configuration for visibility control

### 2. Asset Configuration (`next.config.ts`)

Critical for iframe rendering. Sets `assetPrefix` to ensure `/_next/` static assets load from the correct origin:

```typescript
const nextConfig: NextConfig = {
  assetPrefix: baseURL,  // Prevents 404s in iframe
};
```

Without this, Next.js attempts to load assets from the iframe URL, causing failures.

### 3. CORS Middleware (`middleware.ts`)

Handles OPTIONS preflight requests required for cross-origin React Server Component fetching during client-side navigation.

### 4. SDK Bootstrap (`app/layout.tsx`)

The `NextChatSDKBootstrap` component patches browser APIs to work within ChatGPT's iframe:

- `fetch` - Rewrites same-origin requests to use correct base URL
- `history.pushState/replaceState` - Prevents full-origin URLs in history
- HTML element observer - Prevents ChatGPT from modifying root element

Required configuration:
```tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <NextChatSDKBootstrap baseUrl={baseURL} />
  </head>
  <body>{children}</body>
</html>
```

Note: `suppressHydrationWarning` is required because ChatGPT modifies initial HTML before Next.js hydrates.

### 5. Custom Hooks (`app/hooks/`)

React hooks that wrap `window.openai` for clean, testable component code. Each hook provides reactive access to a specific bridge capability:

```typescript
const weather = useToolOutput<WeatherData>();
const callTool = useCallTool();
const [state, setState] = useWidgetState();
const sendMessage = useSendMessage();
const theme = useTheme();
```

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The application runs on `http://localhost:3009`. The MCP server is available at `http://localhost:3009/mcp`.

### Exploring Examples

Navigate to the home page and browse the widget gallery. Each example demonstrates a specific capability:

- **Read-Only Widget** - Simple data display
- **Widget-Accessible Tools** - Interactive components using `callTool()`
- **Message Injection** - Using `sendFollowUpMessage()`
- **External Links** - Opening URLs with `openExternal()`
- **Display Mode** - Requesting layout changes
- **State Persistence** - Saving component state with `setWidgetState()`
- **Widget Descriptions** - Metadata optimization
- **Content Security Policy** - Network permission configuration

### Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel-labs/chatgpt-apps-sdk-nextjs-starter)

The `baseUrl.ts` configuration automatically detects Vercel environments:
- Production URLs via `VERCEL_PROJECT_PRODUCTION_URL`
- Preview/branch URLs via `VERCEL_BRANCH_URL`
- Local development fallback

### Connecting to ChatGPT

1. Deploy your application to a publicly accessible URL
2. In ChatGPT, navigate to **Settings → Connectors → Create**
3. Add your MCP server URL with the `/mcp` path (e.g., `https://your-app.vercel.app/mcp`)

Note: Connecting MCP servers to ChatGPT requires developer mode access. See the [connection guide](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt) for setup instructions.

## Building Your Own Widgets

### 1. Define Your Tool

Register a new tool in `app/mcp/route.ts`:

```typescript
{
  name: "my_tool",
  description: "What this tool does",
  inputSchema: { /* ... */ },
  outputSchema: { /* ... */ },
  _meta: {
    "openai/outputTemplate": "template://widgets/my-widget",
    "openai/widgetAccessible": true,  // Enable callTool()
    "openai/toolInvocation/invoking": "Loading...",
    "openai/toolInvocation/invoked": "Loaded"
  }
}
```

### 2. Create Your Widget

Build a React component in `app/widgets/my-widget/page.tsx`:

```typescript
export default function MyWidget() {
  const data = useToolOutput<MyDataType>();
  const theme = useTheme();
  const callTool = useCallTool();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {/* Your UI here */}
    </div>
  );
}
```

### 3. Register Your Resource

Add resource registration in `app/mcp/route.ts`:

```typescript
{
  uri: "template://widgets/my-widget",
  name: "My Widget",
  mimeType: "text/html+skybridge",
  _meta: {
    "openai/widgetDescription": "Clear description for the model",
    "openai/widgetPrefersBorder": true,
    "openai/widgetCSP": {
      connect_domains: ["api.example.com"],
      resource_domains: ["cdn.example.com"]
    }
  }
}
```

### 4. Handle Tool Invocation

Implement the tool handler:

```typescript
if (request.params.name === "my_tool") {
  return {
    structuredContent: { /* Data for model and widget */ },
    content: "Human-readable summary",
    _meta: { /* Widget-only metadata */ }
  };
}
```

## Documentation

This project includes comprehensive documentation:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system architecture, data flow diagrams, and metadata reference
- **[GUIDE.md](./GUIDE.md)** - Interactive example gallery with categorized patterns
- **[OPENAI_WIDGET_ARCHITECTURE.md](./OPENAI_WIDGET_ARCHITECTURE.md)** - Physical architecture, component lifecycle, and implementation patterns
- **[WINDOW_OPENAI_COMPLETE.md](./WINDOW_OPENAI_COMPLETE.md)** - Complete `window.openai` API reference and best practices

## Technology Stack

- **Framework:** Next.js 15.5.4 with Turbopack
- **Runtime:** React 19.1.0 with React Server Components
- **Backend Protocol:** Model Context Protocol (MCP) 1.20.0
- **MCP Handler:** mcp-handler 1.0.2
- **UI Components:** Radix UI + Tailwind CSS 4
- **Validation:** Zod 3.24.2
- **Icons:** Lucide React

## Best Practices

1. **Use hooks** to wrap `window.openai` for cleaner, testable components
2. **Set `widgetDescription`** to reduce redundant model narration
3. **Configure CSP** explicitly for any external resources your widget needs
4. **Keep `widgetState` under ~4k tokens** for optimal performance
5. **Use `structuredContent`** for data shared between model and widget
6. **Use `_meta`** for widget-only data like API keys or debug information
7. **Set `readOnlyHint: true`** for non-mutating operations to help model planning
8. **Keep status messages under 64 characters** for `invoking` and `invoked` states

## Learn More

- [OpenAI Apps SDK Documentation](https://developers.openai.com/apps-sdk)
- [Custom UX Guide](https://developers.openai.com/apps-sdk/build/custom-ux)
- [API Reference](https://developers.openai.com/apps-sdk/reference)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Next.js Documentation](https://nextjs.org/docs)

## Example: Complete Weather Widget

Here's how all pieces connect for a weather widget:

**Tool Registration:**
```typescript
{
  name: "get_weather",
  inputSchema: { location: "string" },
  _meta: {
    "openai/outputTemplate": "template://widgets/weather",
    "openai/widgetAccessible": true
  }
}
```

**Resource Registration:**
```typescript
{
  uri: "template://widgets/weather",
  _meta: {
    "openai/widgetDescription": "Shows current weather with forecast",
    "openai/widgetCSP": {
      connect_domains: ["api.weather.com"]
    }
  }
}
```

**Tool Response:**
```typescript
{
  structuredContent: {
    temperature: 72,
    condition: "sunny",
    location: "San Francisco"
  },
  content: "The weather in San Francisco is 72°F and sunny."
}
```

**Widget Component:**
```typescript
export default function WeatherWidget() {
  const weather = useToolOutput<WeatherData>();
  const callTool = useCallTool();

  async function refresh() {
    await callTool("get_weather", { location: weather.location });
  }

  return (
    <Card>
      <h2>{weather.location}</h2>
      <p>{weather.temperature}°F - {weather.condition}</p>
      <Button onClick={refresh}>Refresh</Button>
    </Card>
  );
}
```

This is a production-ready starting point for building sophisticated ChatGPT applications. Explore the examples, understand the patterns, and build something unique.
