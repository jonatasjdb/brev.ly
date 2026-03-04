import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { exportLinks } from "@/app/functions/export-links";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/export",
		{
			schema: {
				summary: "Export Links",
				response: {
					200: z.object({
						reportUrl: z.string(),
					}),
				},
			},
		},
		async (_request, reply) => {
			const { reportUrl } = await exportLinks();

			return reply.status(200).send({ reportUrl });
		},
	);
};
