import { eq, sql } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { links } from "@/infra/db/schemas/links"
import { NotFound } from "./errors/not-found"

const registerLinkAccessInput = z.object({
	id: z.string().uuid(),
})

type RegisterLinkAccess = z.input<typeof registerLinkAccessInput>

export async function registerLinkAccess(
	input: RegisterLinkAccess,
): Promise<{ accessCount: number }> {
	const { id } = registerLinkAccessInput.parse(input)

	const [result] = await db
		.update(schema.links)
		.set({ accessCount: sql`${links.accessCount} + 1` })
		.where(eq(links.id, id))
		.returning({ accessCount: links.accessCount })

	if (!result) {
		throw new NotFound()
	}

	return result
}
