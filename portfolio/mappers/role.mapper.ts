import { Role } from '@/models/role.model'

export type RoleRow = {
  id_role:     number
  title:       string
  tagline:     string
  description: string
  city:        string
  start_date:  string
  end_date:    string | null
  visible:     number
  id_company:  number
}

/**
 * Maps raw database rows to Role model instances.
 */
export class RoleMapper {
  /**
   * Converts a raw database row into a Role model.
   * @param {RoleRow} row - The raw database row.
   * @returns {Role} The mapped Role instance.
   */
  static fromRow(row: RoleRow): Role {
    return new Role(
      row.id_role,
      row.title,
      row.tagline,
      row.description,
      row.city,
      row.start_date,
      row.end_date,
      row.visible === 1,
      row.id_company,
    )
  }
}
