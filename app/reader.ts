import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import { cookies, draftMode } from "next/headers";
import { cache } from "react";

import keystaticConfig from "@/keystatic.config";

export const createKeystaticReader = cache(async () => {
  let isDraftModeEnabled = false;
  // draftMode throws in e.g. generateStaticParams
  try {
    isDraftModeEnabled = (await draftMode()).isEnabled;
  } catch {}

  if (isDraftModeEnabled) {
    const branch = (await cookies()).get("ks-branch")?.value;

    if (branch) {
      return createGitHubReader(keystaticConfig, {
        repo: "stefanprobst/issue-next-draft-mode-force-static",
        ref: branch,
        token: (await cookies()).get("keystatic-gh-access-token")?.value,
      });
    }
  }

  return createReader(process.cwd(), keystaticConfig);
});
