"use client";

export default function ReadOnlyWidget() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Read-Only Widget</title>
      </head>
      <body>
        <div id="read-only-root"></div>
        <script type="module" src="/widgets/read-only/index.tsx"></script>
      </body>
    </html>
  );
}
