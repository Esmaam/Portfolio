import type Database from 'better-sqlite3'
import { Owner } from '@/models/owner.model'
import { OwnerMapper, type OwnerRow } from '@/mappers/owner.mapper'

/**
 * Provides database access for the Owner entity.
 */
export class OwnerRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves the single portfolio owner from the database.
   * @returns {Owner} The portfolio owner.
   */
  getOwner(): Owner {
    const row = this.db.prepare('SELECT * FROM owner LIMIT 1').get() as OwnerRow
    return OwnerMapper.fromRow(row)
  }
}
