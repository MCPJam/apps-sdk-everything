import type { ReactNode } from "react";

export default function WidgetsLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Simple layout without Navigation - widgets should be clean
  return <>{children}</>;
}
