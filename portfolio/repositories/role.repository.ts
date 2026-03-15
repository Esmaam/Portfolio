import type Database from 'better-sqlite3'
import { Role } from '@/models/role.model'
import { RoleMapper, type RoleRow } from '@/mappers/role.mapper'

/**
 * Provides database access for the Role entity.
 */
export class RoleRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all roles from the database, ordered by start date descending.
   * @returns {Role[]} All roles.
   */
  getAll(): Role[] {
    const rows = this.db.prepare('SELECT * FROM role ORDER BY start_date DESC').all() as RoleRow[]
    return rows.map(RoleMapper.fromRow)
  }

  /**
   * Retrieves all roles marked as visible, ordered by start date descending.
   * @returns {Role[]} All visible roles.
   */
  getVisible(): Role[] {
    const rows = this.db.prepare('SELECT * FROM role WHERE visible = 1 ORDER BY start_date DESC').all() as RoleRow[]
    return rows.map(RoleMapper.fromRow)
  }

  /**
   * Retrieves a single role by its identifier.
   * @param {number} id - The role identifier.
   * @returns {Role | undefined} The matching role, or undefined if not found.
   */
  getById(id: number): Role | undefined {
    const row = this.db.prepare('SELECT * FROM role WHERE id_role = ?').get(id) as RoleRow | undefined
    return row ? RoleMapper.fromRow(row) : undefined
  }
}
