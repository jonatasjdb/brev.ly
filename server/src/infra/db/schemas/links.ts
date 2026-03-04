import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";
import { timestamps } from "../helpers/timestamps";

export const links = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	originalUrl: text("original_url").notNull(),
	shortUrl: text("short_url").notNull().unique(),
	accessCount: integer("access_count").notNull().default(0),
	...timestamps,
});
