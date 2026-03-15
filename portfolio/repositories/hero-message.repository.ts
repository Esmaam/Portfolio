import type { Client } from '@libsql/client'
import { HeroMessage } from '@/models/hero-message.model'
import { HeroMessageMapper, type HeroMessageRow } from '@/mappers/hero-message.mapper'

/**
 * Provides database access for the HeroMessage entity.
 */
export class HeroMessageRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all hero messages from the database.
   * @returns {Promise<HeroMessage[]>} All hero messages.
   */
  async getAll(): Promise<HeroMessage[]> {
    const { rows } = await this.db.execute('SELECT * FROM heromessage')
    return (rows as unknown as HeroMessageRow[]).map(HeroMessageMapper.fromRow)
  }
}
