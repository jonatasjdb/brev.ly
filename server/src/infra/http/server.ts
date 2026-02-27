import fastifyCors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import scalarUI from "@scalar/fastify-api-reference"
import fastify from "fastify"
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod"
import { env } from "@/env"
import { createLinkRoute } from "./routes/create-link"
import { deleteLinkRoute } from "./routes/delete-link"
import { exportLinksRoute } from "./routes/export-links"
import { getLinksRoute } from "./routes/get-links"
import { getOriginalLinkRoute } from "./routes/get-original-link"
import { accessCountLinkRoute } from "./routes/register-link-access"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: "*" })

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev",
			version: "1.0.0",
		},
	},

	transform: jsonSchemaTransform,
})

app.register(getLinksRoute)
app.register(getOriginalLinkRoute)
app.register(createLinkRoute)
app.register(accessCountLinkRoute)
app.register(deleteLinkRoute)
app.register(exportLinksRoute)

app.get("/openapi.json", () => app.swagger())

app.register(scalarUI, {
	routePrefix: "/docs",
	configuration: {},
})

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log("HTTP Server Running!")
	})
