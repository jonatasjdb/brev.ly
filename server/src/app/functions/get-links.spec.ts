import { beforeEach, describe, expect, it } from "vitest"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { makeLink } from "@/test/factories/make-link"
import { getLinks } from "./get-links"

describe("Get links", () => {
	beforeEach(async () => {
		await db.delete(schema.links)
	})
	it("should be able to get all links", async () => {
		const link1 = await makeLink()
		const link2 = await makeLink()
		const link3 = await makeLink()
		const link4 = await makeLink()
		const link5 = await makeLink()

		const sut = await getLinks({})

		expect(sut.total).toEqual(5)
		expect(sut.data).toEqual([
			expect.objectContaining({ id: link1.id }),
			expect.objectContaining({ id: link2.id }),
			expect.objectContaining({ id: link3.id }),
			expect.objectContaining({ id: link4.id }),
			expect.objectContaining({ id: link5.id }),
		])
	})

	it("should be able to paginated links", async () => {
		const link1 = await makeLink()
		const link2 = await makeLink()
		const link3 = await makeLink()
		const link4 = await makeLink()
		const link5 = await makeLink()

		let sut = await getLinks({
			page: 1,
			pageSize: 3,
		})

		expect(sut.total).toEqual(5)
		expect(sut.data).toEqual([
			expect.objectContaining({ id: link1.id }),
			expect.objectContaining({ id: link2.id }),
			expect.objectContaining({ id: link3.id }),
		])

		sut = await getLinks({
			page: 2,
			pageSize: 3,
		})

		expect(sut.total).toEqual(5)
		expect(sut.data).toEqual([
			expect.objectContaining({ id: link4.id }),
			expect.objectContaining({ id: link5.id }),
		])
	})
})
