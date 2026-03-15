import { Owner } from '@/models/owner.model'

export type OwnerRow = {
  id_owner:             number
  first_name:           string
  last_name:            string
  email:                string
  linkedin_profile_url: string | null
}

/**
 * Maps raw database rows to Owner model instances.
 */
export class OwnerMapper {
  /**
   * Converts a raw database row into an Owner model.
   * @param {OwnerRow} row - The raw database row.
   * @returns {Owner} The mapped Owner instance.
   */
  static fromRow(row: OwnerRow): Owner {
    return new Owner(row.id_owner, row.first_name, row.last_name, row.email, row.linkedin_profile_url)
  }
}
