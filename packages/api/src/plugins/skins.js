import axios from "axios";
import plugin from "fastify-plugin";

async function skins(fastify) {
  const skindata = await axios.get("https://na.api.riotgames.com/val/content/v1/contents", {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });
  fastify.skins = skindata.data.skins;
  fastify.skinlevels = skindata.data.skinLevels;
}

export default plugin(skins);
