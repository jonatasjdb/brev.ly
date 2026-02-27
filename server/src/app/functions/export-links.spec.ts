import { describe, expect, it, vi } from "vitest"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import * as storageModule from "@/infra/storage/upload-file-to-storage"
import { exportLinks } from "./export-links"

describe("exportLinks (integration)", () => {
	it("should export real database data to csv", async () => {
		await db.insert(schema.links).values([
			{
				originalUrl: "https://google.com",
				shortUrl: "goo",
				accessCount: 5,
			},
			{
				originalUrl: "https://github.com",
				shortUrl: "git",
				accessCount: 10,
			},
		])

		let capturedCsv = ""

		// 2️⃣ Mock upload para capturar o stream
		vi.spyOn(storageModule, "uploadFileToStorage").mockImplementation(
			async ({ contentStream }) => {
				await new Promise<void>((resolve, reject) => {
					contentStream.on("data", (chunk) => {
						capturedCsv += chunk.toString()
					})

					contentStream.on("end", resolve)
					contentStream.on("error", reject)
				})

				return {
					key: "fake-key.csv",
					url: "http://fake-url/report.csv",
				}
			},
		)

		const result = await exportLinks()

		expect(result.reportUrl).toBe("http://fake-url/report.csv")

		expect(capturedCsv).toContain("ID")
		expect(capturedCsv).toContain("Original URL")
		expect(capturedCsv).toContain("https://google.com")
		expect(capturedCsv).toContain("https://github.com")
	})
})
