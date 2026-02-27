import { beforeEach, describe, expect, it } from "vitest"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { createLink } from "./create-link"
import { NotFound } from "./errors/not-found"
import { getOriginalLink } from "./get-original-link"

describe("Get original Link", () => {
	beforeEach(async () => {
		await db.delete(schema.links)
	})
	it("should be able to get a original link", async () => {
		await createLink({
			link: "https://linkoriginal.com",
			shortLink: "linkoriginal",
		})

		const result = await getOriginalLink({ shortUrl: "linkoriginal" })

		expect(result).toEqual(
			expect.objectContaining({ url: "https://linkoriginal.com" }),
		)
	})

	it("should not be able to get link not founded", async () => {
		await expect(
			getOriginalLink({ shortUrl: "calcajeans" }),
		).rejects.toBeInstanceOf(NotFound)
	})
})
