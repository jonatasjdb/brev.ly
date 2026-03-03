import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z, { coerce } from "zod";
import { getLinks } from "@/app/functions/get-links";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links",
		{
			schema: {
				summary: "Get All Links",
				querystring: z.object({
					page: coerce.number().optional().default(1),
					pageSize: z.coerce.number().optional().default(20),
				}),
				response: {
					200: z.object({
						total: z.number(),
						data: z.array(
							z.object({
								id: z.uuid(),
								originalUrl: z.string(),
								shortUrl: z.string(),
								accessCount: z.number(),
							}),
						),
					}),
				},
			},
		},
		async (request, reply) => {
			const { page, pageSize } = request.query;

			const { total, data } = await getLinks({ page, pageSize });

			return reply.send({ total, data });
		},
	);
};
