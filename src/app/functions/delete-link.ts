import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { links } from "@/infra/db/schemas/links"
import { NotFound } from "./errors/not-found"

const deleteLinkInput = z.object({
	id: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(input: DeleteLinkInput): Promise<void> {
	const { id } = deleteLinkInput.parse(input)

	const [deleted] = await db.delete(links).where(eq(links.id, id)).returning()

	if (!deleted) {
		throw new NotFound()
	}

	return
}
