import "@/app/styles.css";

import { cookies, draftMode } from "next/headers";
import React from "react";

import { createKeystaticReader } from "@/app/reader";

// export const dynamicParams = false;
// export const dynamic = "force-static";

export async function generateStaticParams() {
  const reader = await createKeystaticReader();
  const ids = await reader.collections.posts.list();

  return ids.map((id) => ({
    id,
  }));
}

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const { isEnabled } = await draftMode();

  const reader = await createKeystaticReader();
  const post = await reader.collections.posts.read(id);

  if (!post) return <div>Post not found!</div>;

  const content = await post.content();

  return (
    <div>
      <h1>{post.title}</h1>
      {content}

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
