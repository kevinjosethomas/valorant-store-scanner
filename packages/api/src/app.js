import fastify from "fastify";
import { fileURLToPath } from "url";
import static from "fastify-static";
import path, { dirname } from "path";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = fastify({
  logger: true,
});

app.register(static, {
  root: path.join(__dirname, "../assets"),
  prefix: "/public/",
});

const run = async () => {
  await app.listen(process.env.PORT);
  console.log(`Server listening on Port ${process.env.PORT}`);
};
