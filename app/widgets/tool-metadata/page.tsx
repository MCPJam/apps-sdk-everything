"use client";

export default function ToolMetadataWidget() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tool Metadata Widget</title>
      </head>
      <body>
        <div id="tool-metadata-root"></div>
        <script type="module" src="/widgets/tool-metadata/index.tsx"></script>
      </body>
    </html>
  );
}
