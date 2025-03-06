import "@/app/globals.css";

import Link from "next/link";
import { type ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout(
  props: Readonly<RootLayoutProps>
): ReactNode {
  const { children } = props;

  return (
    <html lang="en">
      <body className="p-8 grid gap-y-8">
        <nav>
          <Link className="underline" href="/">
            Go to home page
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
