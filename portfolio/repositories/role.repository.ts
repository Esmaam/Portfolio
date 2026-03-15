import type { Client } from '@libsql/client'
import { Role } from '@/models/role.model'
import { RoleMapper, type RoleRow } from '@/mappers/role.mapper'

/**
 * Provides database access for the Role entity.
 */
export class RoleRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all roles from the database, ordered by start date descending.
   * @returns {Promise<Role[]>} All roles.
   */
  async getAll(): Promise<Role[]> {
    const { rows } = await this.db.execute('SELECT * FROM role ORDER BY start_date DESC')
    return (rows as unknown as RoleRow[]).map(RoleMapper.fromRow)
  }

  /**
   * Retrieves all roles marked as visible, ordered by start date descending.
   * @returns {Promise<Role[]>} All visible roles.
   */
  async getVisible(): Promise<Role[]> {
    const { rows } = await this.db.execute('SELECT * FROM role WHERE visible = 1 ORDER BY start_date DESC')
    return (rows as unknown as RoleRow[]).map(RoleMapper.fromRow)
  }

  /**
   * Retrieves a single role by its identifier.
   * @param {number} id - The role identifier.
   * @returns {Promise<Role | undefined>} The matching role, or undefined if not found.
   */
  async getById(id: number): Promise<Role | undefined> {
    const { rows } = await this.db.execute({
      sql:  'SELECT * FROM role WHERE id_role = ?',
      args: [id],
    })
    const row = rows[0] as unknown as RoleRow | undefined
    return row ? RoleMapper.fromRow(row) : undefined
  }
}
