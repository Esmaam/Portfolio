import type Database from 'better-sqlite3'
import { Owner } from '@/models/owner.model'

type OwnerRow = {
  id_owner:             number
  first_name:           string
  last_name:            string
  email:                string
  linkedin_profile_url: string | null
}

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
    return new Owner(row.id_owner, row.first_name, row.last_name, row.email, row.linkedin_profile_url)
  }
}
