import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { deleteLink } from "@/app/functions/delete-link"
import { NotFound } from "@/app/functions/errors/not-found"

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/links/:id",
		{
			schema: {
				summary: "Delete Link",
				params: z.object({
					id: z.string(),
				}),
				response: {
					204: z.void().describe("Link has been deleted"),
					404: z.object({ message: z.string() }).describe("Link not found"),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			try {
				await deleteLink({ id })
				return reply.status(204).send()
			} catch (error) {
				if (error instanceof NotFound) {
					return reply.status(404).send({ message: error.message })
				}
			}
		},
	)
}
