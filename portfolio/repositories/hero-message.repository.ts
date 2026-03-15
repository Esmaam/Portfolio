import type Database from 'better-sqlite3'
import { HeroMessage } from '@/models/hero-message.model'
import { HeroMessageMapper, type HeroMessageRow } from '@/mappers/hero-message.mapper'

/**
 * Provides database access for the HeroMessage entity.
 */
export class HeroMessageRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all hero messages from the database.
   * @returns {HeroMessage[]} All hero messages.
   */
  getAll(): HeroMessage[] {
    const rows = this.db.prepare('SELECT * FROM heromessage').all() as HeroMessageRow[]
    return rows.map(HeroMessageMapper.fromRow)
  }
}
