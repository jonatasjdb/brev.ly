import { beforeEach, describe, expect, it } from "vitest"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { createLink } from "./create-link"
import { AlreadyExists } from "./errors/already-exists"

describe("Create links", () => {
	beforeEach(async () => {
		await db.delete(schema.links)
	})
	it("should be able to create a link", async () => {
		const result = await createLink({
			link: "https://createlink.com",
			shortLink: "createlink",
		})

		expect(result.id).toEqual(expect.any(String))
	})

	it("should not be able to create a link already exists", async () => {
		await createLink({
			link: "https://teste1.com",
			shortLink: "teste",
		})
		await expect(
			createLink({
				link: "https://teste2.com",
				shortLink: "teste",
			}),
		).rejects.toBeInstanceOf(AlreadyExists)
	})
})
