import { count } from "drizzle-orm"
import z, { coerce } from "zod"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { links } from "@/infra/db/schemas/links"

const getLinksInput = z.object({
	page: coerce.number().optional().default(1),
	pageSize: z.coerce.number().optional().default(20),
})

type GetLinksInput = z.input<typeof getLinksInput>

type Link = typeof links.$inferSelect
type LinkListItem = Pick<
	Link,
	"id" | "originalUrl" | "shortUrl" | "accessCount"
>

type GetlinksOutput = {
	total: number
	data: LinkListItem[]
}

export async function getLinks(input: GetLinksInput): Promise<GetlinksOutput> {
	const { page, pageSize } = getLinksInput.parse(input)

	const data = await db
		.select({
			id: links.id,
			originalUrl: links.originalUrl,
			shortUrl: links.shortUrl,
			accessCount: links.accessCount,
		})
		.from(schema.links)
		.offset((page - 1) * pageSize)
		.limit(pageSize)

	const [{ total }] = await db
		.select({ total: count(links.id) })
		.from(schema.links)

	return {
		total,
		data,
	}
}
