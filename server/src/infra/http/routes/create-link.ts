import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createLink } from "@/app/functions/create-link";
import { AlreadyExists } from "@/app/functions/errors/already-exists";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create Link",
				body: z.object({
					link: z.url("Invalid URL"),
					shortLink: z
						.string()
						.min(3)
						.max(20)
						.regex(/^[a-zA-Z0-9_-]+$/, "Invalid short link format"),
				}),
				response: {
					201: z
						.object({
							id: z.uuid(),
							originalUrl: z.string(),
							shortUrl: z.string(),
							accessCount: z.number(),
						})
						.describe("Short Link as been Created"),
					400: z.object({ message: z.string() }).describe("Invalid URL"),
					409: z
						.object({ message: z.string() })
						.describe("Short Link already exists"),
				},
			},
		},
		async (request, reply) => {
			try {
				const { link, shortLink } = request.body;

				const result = await createLink({ link, shortLink });

				return reply.status(201).send(result);
			} catch (error) {
				if (error instanceof AlreadyExists) {
					return reply.status(409).send({
						message: error.message,
					});
				}

				throw error;
			}
		},
	);
};
