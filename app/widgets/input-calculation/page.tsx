"use client";

export default function InputCalculationWidget() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Input & Calculation Widget</title>
      </head>
      <body>
        <div id="input-calculation-root"></div>
        <script type="module" src="/widgets/input-calculation/index.tsx"></script>
      </body>
    </html>
  );
}
