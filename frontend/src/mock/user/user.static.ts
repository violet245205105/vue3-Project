import { encode } from "js-base64";
export const TOKEN_KEY = "banner";

export const createToken = (userId: string) => {
  const token = encode(
    JSON.stringify({
      exp: +new Date() + 10 * 60 * 60 * 1000,
      userId,
      iss: "violet",
      token_key: TOKEN_KEY,
    })
  );
  return token;
};

