import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
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

export async function createLink(input: CreateLinkInput): Promise<void> {
	const { link, shortLink } = createLinkInput.parse(input)

	const [linkAlreadyExists] = await db
		.select({ id: links.id })
		.from(links)
		.where(eq(links.shortUrl, shortLink))

	if (linkAlreadyExists) {
		throw new AlreadyExists()
	}
	await db.insert(links).values({
		originalUrl: link,
		shortUrl: shortLink,
	})

	return
}
