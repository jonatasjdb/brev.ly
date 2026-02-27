import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { links } from "@/infra/db/schemas/links"
import { AlreadyExists } from "./errors/already-exists"

const createLinkInput = z.object({
	link: z.url(),
	shortLink: z
		.string()
		.min(3)
		.max(20)
		.regex(/^[a-zA-Z0-9_-]+$/),
})

type CreateLinkInput = z.input<typeof createLinkInput>

type Link = typeof links.$inferSelect

export async function createLink(input: CreateLinkInput): Promise<Link> {
	const { link, shortLink } = createLinkInput.parse(input)

	const [linkAlreadyExists] = await db
		.select({ id: links.id })
		.from(schema.links)
		.where(eq(links.shortUrl, shortLink))

	if (linkAlreadyExists) {
		throw new AlreadyExists()
	}

	const [result] = await db
		.insert(schema.links)
		.values({
			originalUrl: link,
			shortUrl: shortLink,
		})
		.returning()

	return result
}
