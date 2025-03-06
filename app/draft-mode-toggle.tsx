import { cookies, draftMode } from "next/headers";

export async function DraftModeToggle() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    return null;
  }

	/**
	 * When `dynamic = "force-static", this will be empty.
	 */
  const branch = (await cookies()).get("ks-branch");

  return (
    <footer>
      Draft mode branch: {branch?.value ?? "Unknown"}
      <form action="/api/preview/end" method="POST">
        <button className="underline" type="submit">
          End draft mode
        </button>
      </form>
    </footer>
  );
}
