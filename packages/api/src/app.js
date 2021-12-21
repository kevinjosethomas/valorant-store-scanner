import dotenv from "dotenv";
import fastify from "fastify";
import { fileURLToPath } from "url";
import _static from "fastify-static";
import path, { dirname } from "path";

import skins from "./plugins/skins.js";
import middleware from "./plugins/middleware.js";

import user_login from "./routes/user/login.js";

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = fastify({
  logger: true,
});

app.setErrorHandler((error, req, res) => {
  if (error.validation) {
    return res.status(400).send({
      success: false,
      message: `Bad Request - ${error.validation[0].dataPath} ${error.validation[0].message}`,
    });
  }

  return res.status(error.statusCode).send({
    success: false,
    message: `${error.statusCode} - ${error.message}`,
  });
});

app.register(skins);
app.register(middleware);

app.register(user_login);

app.register(_static, {
  root: path.join(__dirname, "../assets"),
  prefix: "/public/",
});

const run = async () => {
  await app.listen(process.env.PORT);
  console.log(`Server listening on Port ${process.env.PORT}`);
};

run().catch((e) => {
  console.log(e);
});
