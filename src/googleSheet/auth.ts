import { credentials } from '@/credentials'
import { google } from "googleapis"

export async function googleAuth() {
  return await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
      universe_domain: credentials.universe_domain
    }
  })
}