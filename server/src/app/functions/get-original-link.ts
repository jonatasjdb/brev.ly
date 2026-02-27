import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { links } from "@/infra/db/schemas/links"
import { NotFound } from "./errors/not-found"

const getOriginalLinkinput = z.object({
	shortUrl: z.string(),
})

type GetOriginalLinkinput = z.input<typeof getOriginalLinkinput>

type GetiOriginalLinkOutput = {
	id: string
	url: string
}

export async function getOriginalLink(
	input: GetOriginalLinkinput,
): Promise<GetiOriginalLinkOutput> {
	const { shortUrl } = getOriginalLinkinput.parse(input)
	const [link] = await db
		.select()
		.from(schema.links)
		.where(eq(links.shortUrl, shortUrl))

	if (!link) {
		throw new NotFound()
	}

	return { id: link.id, url: link.originalUrl }
}
