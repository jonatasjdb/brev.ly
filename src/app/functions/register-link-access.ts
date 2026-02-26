import { eq, sql } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { links } from "@/infra/db/schemas/links"
import { NotFound } from "./errors/not-found"

const registerLinkAccessInput = z.object({
	id: z.string().uuid(),
})

type RegisterLinkAccess = z.input<typeof registerLinkAccessInput>

export async function registerLinkAccess(
	input: RegisterLinkAccess,
): Promise<void> {
	const { id } = registerLinkAccessInput.parse(input)

	const [linkUpdated] = await db
		.update(links)
		.set({ accessCount: sql`${links.accessCount} + 1` })
		.where(eq(links.id, id))
		.returning({ id: links.id })

	if (!linkUpdated) {
		throw new NotFound()
	}

	return
}
