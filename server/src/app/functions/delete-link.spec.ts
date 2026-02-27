import { randomUUID } from "node:crypto"
import { beforeEach, describe, expect, it } from "vitest"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { createLink } from "./create-link"
import { deleteLink } from "./delete-link"
import { NotFound } from "./errors/not-found"

describe("Delete links", () => {
	beforeEach(async () => {
		await db.delete(schema.links)
	})
	it("should be able to delete link", async () => {
		const link = await createLink({
			link: "http://google.com",
			shortLink: "google",
		})

		const result = await deleteLink({ id: link.id })

		expect(result).toEqual({ id: result.id })
	})

	it("should not be able to delete link not founded", async () => {
		await expect(deleteLink({ id: randomUUID() })).rejects.toBeInstanceOf(
			NotFound,
		)
	})
})
