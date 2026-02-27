import { sql } from "drizzle-orm"
import { afterEach, beforeEach } from "vitest"
import { db } from "@/infra/db"

beforeEach(async () => {
	await db.execute(sql`begin`)
})

afterEach(async () => {
	await db.execute(sql`rollback`)
})
