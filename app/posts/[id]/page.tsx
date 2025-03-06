import { ReactNode } from "react";

import { DraftModeToggle } from "@/app/draft-mode-toggle";
import { createReader } from "@/app/reader";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const reader = await createReader();
  const ids = reader.list();

  return ids.map((id) => {
    return { id };
  });
}

export default async function PostPage(
  props: Readonly<PostPageProps>
): Promise<ReactNode> {
  const { params } = props;

  const { id: _id } = await params;
  const id = decodeURIComponent(_id);

  const reader = await createReader();
  const post = reader.read(id);

  return (
    <main>
      <h1>ID: {id}</h1>
      <div>
        <h2>Content</h2>
        <pre>{JSON.stringify({ post })}</pre>
        <DraftModeToggle />
      </div>
    </main>
  );
}
