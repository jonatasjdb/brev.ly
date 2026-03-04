import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stringify } from "csv-stringify";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";

export async function exportLinks() {
	const { sql, params } = await db
		.select({
			id: schema.links.id,
			originalUrl: schema.links.originalUrl,
			shortUrl: schema.links.shortUrl,
			accessCount: schema.links.accessCount,
			createdAt: schema.links.created_at,
		})
		.from(schema.links)
		.toSQL();

	const cursor = pg.unsafe(sql, params as string[]).cursor(2);

	const csv = stringify({
		delimiter: ",",
		header: true,
		columns: [
			{ key: "id", header: "ID" },
			{ key: "original_url", header: "Original URL" },
			{ key: "short_url", header: "Short URL" },
			{ key: "access_count", header: "Access Count" },
			{ key: "created_at", header: "Created At" },
		],
	});

	const uploadtoStorageStream = new PassThrough();

	const convertToCSVPipeLine = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _encoding, callback) {
				for (const chunk of chunks) {
					this.push(chunk);
				}

				callback();
			},
		}),
		csv,
		uploadtoStorageStream,
	);

	const uploadToStorage = uploadFileToStorage({
		contentType: "text/csv",
		folder: "downloads",
		fileName: `${new Date().toISOString()}-uploads.csv`,
		contentStream: uploadtoStorageStream,
	});

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeLine]);

	return { reportUrl: url };
}
