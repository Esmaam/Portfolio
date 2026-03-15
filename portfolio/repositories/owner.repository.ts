import type { Client } from '@libsql/client'
import { Owner } from '@/models/owner.model'
import { OwnerMapper, type OwnerRow } from '@/mappers/owner.mapper'

/**
 * Provides database access for the Owner entity.
 */
export class OwnerRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves the single portfolio owner from the database.
   * @returns {Promise<Owner>} The portfolio owner.
   */
  async getOwner(): Promise<Owner> {
    const { rows } = await this.db.execute('SELECT * FROM owner LIMIT 1')
    return OwnerMapper.fromRow(rows[0] as unknown as OwnerRow)
  }
}
