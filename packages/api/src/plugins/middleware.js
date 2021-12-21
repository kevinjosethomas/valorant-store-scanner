import plugin from "fastify-plugin";

import cors from "fastify-cors";
import helmet from "fastify-helmet";
import compress from "fastify-compress";

async function middleware(fastify) {
  fastify.register(cors);
  fastify.register(helmet);
  fastify.register(compress);
}

export default plugin(middleware);
