import fs from "fs";
import axios from "axios";
import plugin from "fastify-plugin";

async function middleware(fastify) {
  const skindata = await axios.get("https://na.api.riotgames.com/val/content/v1/contents", {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });

  const skins = JSON.parse(fs.readFileSync(`${fastify.__dirname}/data/skins.json`));

  fastify.skins = skins;
  fastify.skinLevels = skindata.data.skinLevels;
}

export default plugin(middleware);
