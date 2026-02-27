import { faker } from "@faker-js/faker"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"

export async function makeLink() {
	const randomUrl = new URL(faker.internet.url())

	const result = await db
		.insert(schema.links)
		.values({
			originalUrl: randomUrl.origin,
			shortUrl: randomUrl.host,
		})
		.returning()

	return result[0]
}
