import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { timestamps } from "../helpers/timestamps"

export const links = pgTable("links", {
	id: uuid("id").primaryKey().defaultRandom(),
	originalUrl: text("original_url").notNull(),
	shortUrl: text("short_url").notNull().unique(),
	accessCount: integer("access_count"),
	...timestamps,
})
