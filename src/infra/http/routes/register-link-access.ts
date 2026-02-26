import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { NotFound } from "@/app/functions/errors/not-found"
import { registerLinkAccess } from "@/app/functions/register-link-access"

export const accessCountLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links/:id/access",
		{
			schema: {
				summary: "Increment Access count",
				params: z.object({
					id: z.string(),
				}),
				response: {
					200: z.void().describe("Access incremented"),
					404: z.object({ message: z.string() }).describe("Link Not Found"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			try {
				await registerLinkAccess({ id })
				return reply.send()
			} catch (error) {
				if (error instanceof NotFound) {
					return reply.status(404).send({ message: error.message })
				}
			}
		},
	)
}
