"use client";

export default function StructuredContentWidget() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Structured Content Widget</title>
      </head>
      <body>
        <div id="structured-content-root"></div>
        <script type="module" src="/widgets/structured-content/index.tsx"></script>
      </body>
    </html>
  );
}
