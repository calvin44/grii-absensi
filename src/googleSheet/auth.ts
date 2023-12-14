import { google } from "googleapis"

export async function googleAuth() {
  return await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
      universe_domain: process.env.UNIVERSE_DOMAIN
    }
  })
}