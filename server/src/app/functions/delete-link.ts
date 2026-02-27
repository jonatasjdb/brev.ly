import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { links } from "@/infra/db/schemas/links"
import { NotFound } from "./errors/not-found"

const deleteLinkInput = z.object({
	id: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
	input: DeleteLinkInput,
): Promise<{ id: string }> {
	const { id } = deleteLinkInput.parse(input)

	const [deleted] = await db
		.delete(schema.links)
		.where(eq(links.id, id))
		.returning({ id: links.id })

	if (!deleted) {
		throw new NotFound()
	}

	return deleted
}
