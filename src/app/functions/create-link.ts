import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { links } from "@/infra/db/schemas/links"
import { AlreadyExists } from "./errors/already-exists"

const createLinkInput = z.object({
	link: z.url(),
	short_link: z
		.string()
		.min(3)
		.max(20)
		.regex(/^[a-zA-Z0-9_-]+$/),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink({
	link,
	short_link,
}: CreateLinkInput): Promise<void> {
	const [linkAlreadyExists] = await db
		.select({ id: links.id })
		.from(links)
		.where(eq(links.shortUrl, short_link))

	if (linkAlreadyExists) {
		throw new AlreadyExists()
	}
	await db.insert(links).values({
		originalUrl: link,
		shortUrl: short_link,
	})

	return
}
