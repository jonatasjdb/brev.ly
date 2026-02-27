import { randomUUID } from "node:crypto"
import { beforeEach, describe, expect, it } from "vitest"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { createLink } from "./create-link"
import { NotFound } from "./errors/not-found"
import { registerLinkAccess } from "./register-link-access"

describe("Register links", () => {
	beforeEach(async () => {
		await db.delete(schema.links)
	})
	it("should be able to register link access", async () => {
		const link = await createLink({
			link: "http://google.com",
			shortLink: "google",
		})

		const result = await registerLinkAccess({ id: link.id })

		expect(result).toEqual({ accessCount: 1 })
	})

	it("should not be able to register link access not founded", async () => {
		await expect(
			registerLinkAccess({ id: randomUUID() }),
		).rejects.toBeInstanceOf(NotFound)
	})
})
