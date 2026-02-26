import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { NotFound } from "@/app/functions/errors/not-found"
import { getOriginalLink } from "@/app/functions/get-original-link"

export const getOriginalLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/:shortUrl",
		{
			schema: {
				summary: "Get Original Link",
				params: z.object({ shortUrl: z.string() }),
				response: {
					200: z.object({ url: z.string() }).describe("Original Link"),
					404: z.object({ message: z.string() }).describe("Link not found"),
				},
			},
		},
		async (request, reply) => {
			const { shortUrl } = request.params

			try {
				const url = await getOriginalLink({ shortUrl })

				return reply.send(url)
			} catch (error) {
				if (error instanceof NotFound) {
					return reply.status(404).send({ message: error.message })
				}
			}
		},
	)
}
