import { jwtVerify, SignJWT } from "jose";

const SECRET_KEY = process.env.SECRET_KEY!;
const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(key);
}
