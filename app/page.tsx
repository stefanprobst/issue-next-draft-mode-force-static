import Link from "next/link";

import { DraftModeToggle } from "@/app/draft-mode-toggle";

export default function Home() {
  return (
    <main className="grid gap-y-8">
      <Link
        className="underline"
        href="/api/preview/start?branch=main&to=/posts/first-post"
      >
        Display "first-post" in draft mode.
      </Link>

      <Link
        className="underline"
        href="/api/preview/start?branch=main&to=/posts/new-post"
      >
        Display "new-post" in draft mode.
      </Link>

      <DraftModeToggle />
    </main>
  );
}
