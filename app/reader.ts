import { draftMode } from "next/headers";

import data from "@/data.json";
import { cache } from "react";

export const createReader = cache(async function createReader() {
  const posts = (
    (await isDraftModeEnabled()) ? data.draft : data.static
  ) as Record<string, { title: string }>;

  return {
    list() {
      return Object.keys(posts);
    },
    read(id: string) {
      return posts[id];
    },
  };
})

/** `draftMode` throws in `generateStaticParams` */
async function isDraftModeEnabled() {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    return false;
  }
}

