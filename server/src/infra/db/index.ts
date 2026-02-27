import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "@/env"
import { schema } from "./schemas"

env.DATABASE_URL
export const pg = postgres(
	env.DATABASE_URL,
	env.NODE_ENV === "test" ? { max: 1 } : undefined,
)
export const db = drizzle(pg, { schema })
