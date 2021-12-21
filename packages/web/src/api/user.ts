import axios from "axios";

async function Login(username: string, password: string) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      username,
      password,
    });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
}

async function GetStorefront(
  player_id: string,
  access_token: string,
  entitlement_token: string,
  region: string
) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/store`, {
      player_id,
      access_token,
      entitlement_token,
      region,
    });
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
}

export { Login, GetStorefront };
