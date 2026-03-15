import Database from 'better-sqlite3'
import path from 'path'

declare global {
  var _db: Database.Database | undefined
}

/**
 * Opens and returns the SQLite connection.
 * Enables WAL mode for better read concurrency and enforces foreign key constraints.
 */
function createConnection(): Database.Database {
  const db = new Database(path.join(process.cwd(), 'db', 'portfolio.db'))
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  return db
}

/**
 * Singleton SQLite database connection.
 * In development, the instance is stored on `global` to survive Next.js hot reloads.
 * In production, the module is evaluated once — no global needed.
 */
const db = global._db ?? createConnection()

if (process.env.NODE_ENV !== 'production') global._db = db

export default db
