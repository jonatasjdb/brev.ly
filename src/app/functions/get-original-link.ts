import { eq } from "drizzle-orm"
import z from "zod"
import { db } from "@/infra/db"
import { links } from "@/infra/db/schemas/links"
import { NotFound } from "./errors/not-found"

const getOriginalLinkinput = z.object({
	shortUrl: z.string(),
})

type GetOriginalLinkinput = z.input<typeof getOriginalLinkinput>

export async function getOriginalLink(
	input: GetOriginalLinkinput,
): Promise<{ url: string }> {
	const { shortUrl } = getOriginalLinkinput.parse(input)
	const [linkExists] = await db
		.select()
		.from(links)
		.where(eq(links.shortUrl, shortUrl))

	if (!linkExists) {
		throw new NotFound()
	}

	return { url: linkExists.originalUrl }
}
