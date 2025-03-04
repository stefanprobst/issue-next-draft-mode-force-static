import { config, collection, fields } from "@keystatic/core";

export default config({
  storage: {
    // kind: "local",
    kind: "github",
    repo: {
      owner: "stefanprobst",
      name: "issue-next-draft-mode-force-static",
    },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      previewUrl: "/api/preview/start?branch={branch}&to=/posts/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.mdx({ label: "Content" }),
      },
    }),
  },
});
