import type { Client } from '@libsql/client'
import { Keyword } from '@/models/keyword.model'
import { KeywordMapper, type KeywordRow } from '@/mappers/keyword.mapper'

/**
 * Provides database access for the Keyword entity.
 */
export class KeywordRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all keywords from the database.
   * @returns {Promise<Keyword[]>} All keywords.
   */
  async getAll(): Promise<Keyword[]> {
    const { rows } = await this.db.execute('SELECT * FROM keyword')
    return (rows as unknown as KeywordRow[]).map(KeywordMapper.fromRow)
  }

  /**
   * Retrieves keywords linked to the given role via the role_keyword junction table.
   * @param {number} roleId - The role identifier.
   * @returns {Promise<Keyword[]>} Keywords associated with the given role.
   */
  async getByRole(roleId: number): Promise<Keyword[]> {
    const { rows } = await this.db.execute({
      sql: `
        SELECT k.* FROM keyword k
        INNER JOIN rolekeyword rk ON rk.id_keyword = k.id_keyword
        WHERE rk.id_role = ?
      `,
      args: [roleId],
    })
    return (rows as unknown as KeywordRow[]).map(KeywordMapper.fromRow)
  }

  /**
   * Retrieves keywords linked to the given project via the keyword_project junction table.
   * @param {number} projectId - The project identifier.
   * @returns {Promise<Keyword[]>} Keywords associated with the given project.
   */
  async getByProject(projectId: number): Promise<Keyword[]> {
    const { rows } = await this.db.execute({
      sql: `
        SELECT k.* FROM keyword k
        INNER JOIN projectkeyword kp ON kp.id_keyword = k.id_keyword
        WHERE kp.id_project = ?
      `,
      args: [projectId],
    })
    return (rows as unknown as KeywordRow[]).map(KeywordMapper.fromRow)
  }
}
