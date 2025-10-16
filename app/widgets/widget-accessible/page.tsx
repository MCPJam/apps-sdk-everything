"use client";

export default function WidgetAccessibleTool() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Widget Accessible Tool</title>
      </head>
      <body>
        <div id="widget-accessible-root"></div>
        <script type="module" src="/widgets/widget-accessible/index.tsx"></script>
      </body>
    </html>
  );
}
