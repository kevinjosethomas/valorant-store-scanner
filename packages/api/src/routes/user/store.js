import axios from "axios";

const UserStoreSchema = {
  body: {
    type: "object",
    required: ["player_id", "access_token", "entitlement_token"],
    properties: {
      player_id: { type: "string" },
      access_token: { type: "string" },
      entitlement_token: { type: "string" },
      region: {
        type: "string",
        enum: ["na", "eu", "kr", "ap"],
      },
    },
  },
};

export default async function router(fastify) {
  fastify.post("/user/store", { schema: UserStoreSchema }, async (req, res) => {
    const { player_id, access_token, entitlement_token, region } = req.body;

    const [store, storeError] = await GetPlayerStorefront(
      player_id,
      access_token,
      entitlement_token,
      region
    );

    if (storeError) {
      console.log(storeError);
      return res.code(424).send({
        success: false,
        message: "Failed Dependency - Failed to fetch the player's store",
      });
    }

    const skins = [];

    for (const skin of store.data.SkinsPanelLayout.SingleItemOffers) {
      const skinLevel = fastify.skinLevels.find((s) => s.id.toLowerCase() === skin.toLowerCase());
      const foundSkin = fastify.skins.find(
        (s) => s.name.toLowerCase() === skinLevel.name.toLowerCase()
      );

      skins.push(foundSkin);
    }

    return res.code(200).send({
      success: true,
      payload: {
        duration: store.data.SkinsPanelLayout.SingleItemOffersRemainingDurationInSeconds,
        skins: skins,
      },
    });
  });
}

const GetPlayerStorefront = async (player_id, access_token, entitlement_token, region) => {
  try {
    const response = await axios.get(
      `https://pd.${region}.a.pvp.net/store/v2/storefront/${player_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-Riot-Entitlements-JWT": entitlement_token,
        },
      }
    );

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};
