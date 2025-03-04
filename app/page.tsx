import "@/app/styles.css";

import { cookies, draftMode } from "next/headers";
import Link from "next/link";

import { createKeystaticReader } from "@/app/reader";

export default async function Homepage() {
  const { isEnabled } = await draftMode();

  const reader = await createKeystaticReader();
  const posts = await reader.collections.posts.all();

  return (
    <div>
      <h1>Keystatic ⚡️</h1>
      <p>This homepage shows how to load a collection from the reader API.</p>
      <p>
        <a href="/keystatic">Click here to visit the Admin UI</a>, or the link
        below to view a post in the collection.
      </p>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>

      {isEnabled ? (
        <div>
          Draft mode ({(await cookies()).get("ks-branch")?.value}){" "}
          <form method="POST" action="/api/preview/end">
            <button>End preview</button>
          </form>
        </div>
      ) : (
        <div>Not in draft mode</div>
      )}
    </div>
  );
}
