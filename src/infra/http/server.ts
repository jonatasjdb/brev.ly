import fastifyCors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import scalarUI from "@scalar/fastify-api-reference"
import fastify from "fastify"
import { env } from "@/env"

const app = fastify()

app.register(fastifyCors, { origin: "*" })

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev",
			version: "1.0.0",
		},
	},
})

app.register(scalarUI, {
	routePrefix: "/docs",
})

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log("HTTP Server Running!")
	})
