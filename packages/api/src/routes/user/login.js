import axios from "axios";
import https from "https";

const UserLoginSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string", minLength: 3, maxLength: 16 },
      password: { type: "string", minLenth: 8, maxLength: 128 },
    },
  },
};

export default async function router(fastify) {
  fastify.post("/user/login", { schema: UserLoginSchema }, async (req, res) => {
    const { username, password } = req.body;

    const [session, sessionError] = await CreateLoginSession();

    if (sessionError) {
      console.error(sessionError);
      return res.code(424).send({
        success: false,
        message: "Failed Dependency - Failed to create a VALORANT login session",
      });
    }

    const cookies = session.headers["set-cookie"].join("; ");

    const [auth, authError] = await Login(username, password, cookies);
    if (authError) {
      if (authError.response.status === 401) {
        return res.code(401).send({
          success: false,
          message: "Unauthorized - Invalid username or password provided",
        });
      } else {
        console.error(authError);
        return res.code(424).send({
          success: false,
          message: "Failed Dependency - Failed to login via the provided username and password",
        });
      }
    }

    const [token, tokenError] = FilterAccessToken(auth);

    if (!token || tokenError) {
      console.error(tokenError);
      return res.code(500).send({
        success: false,
        message: "Internal Server Error - Failed to fetch access token",
      });
    }

    const [entitlement, player] = await Promise.all([
      FetchEntitlementToken(token),
      FetchPlayerID(token),
    ]);

    if (entitlement[1]) {
      console.error(entitlement[1]);
      return res.code(424).send({
        success: false,
        message: "Failed Dependency - Failed to fetch entitlement token",
      });
    }

    if (player[1]) {
      console.error(player[1]);
      return res.code(424).send({
        success: false,
        message: "Failed Dependency - Failed to fetch player ID",
      });
    }

    const entitlement_token = entitlement[0].data.entitlements_token;
    const id = player[0].data.sub;

    return res.code(200).send({
      success: true,
      payload: {
        id,
        entitlement_token,
        access_token: token,
      },
    });
  });
}

const CreateLoginSession = async () => {
  try {
    const response = await axios.post(
      `${process.env.RIOT_AUTH_URL}/api/v1/authorization`,
      {
        nonce: "1",
        client_id: "play-valorant-web-prod",
        redirect_uri: "https://playvalorant.com/opt_in",
        response_type: "token id_token",
      },
      {
        headers: {
          "User-Agent":
            "RiotClient/43.0.1.4195386.4190634 rso-auth (Windows;10;;Professional, x64)",
        },
        httpsAgent: new https.Agent({
          ciphers: "TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384",
        }),
      }
    );

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

const Login = async (username, password, cookies) => {
  try {
    const response = await axios.put(
      `${process.env.RIOT_AUTH_URL}/api/v1/authorization`,
      {
        type: "auth",
        username: username,
        password: password,
      },
      {
        headers: {
          Cookie: cookies,
          headers: {
            "User-Agent":
              "RiotClient/43.0.1.4195386.4190634 rso-auth (Windows;10;;Professional, x64)",
          },
        },
        httpsAgent: new https.Agent({
          ciphers: "TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384",
        }),
      }
    );

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

const FilterAccessToken = (raw) => {
  try {
    const token = raw.data.response.parameters.uri.match(
      /access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)/
    )[1];

    return [token, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchEntitlementToken = async (access_token) => {
  try {
    const response = await axios.post(
      `${process.env.ENTITLEMENTS_AUTH_URL}/api/token/v1`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchPlayerID = async (access_token) => {
  try {
    const response = await axios.get(`${process.env.RIOT_AUTH_URL}/userinfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};
