import { createClient } from '@libsql/client'
import path from 'path'

/**
 * Turso/libSQL client.
 * In production, uses TURSO_DATABASE_URL + TURSO_AUTH_TOKEN env vars.
 * In development, falls back to the local SQLite file.
 */
const db = createClient({
  url:       process.env.TURSO_DATABASE_URL ?? `file:${path.join(process.cwd(), 'db', 'portfolio.db')}`,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export default db
