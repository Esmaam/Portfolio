import type Database from 'better-sqlite3'
import { Keyword } from '@/models/keyword.model'
import { KeywordMapper, type KeywordRow } from '@/mappers/keyword.mapper'

/**
 * Provides database access for the Keyword entity.
 */
export class KeywordRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all keywords from the database.
   * @returns {Keyword[]} All keywords.
   */
  getAll(): Keyword[] {
    const rows = this.db.prepare('SELECT * FROM keyword').all() as KeywordRow[]
    return rows.map(KeywordMapper.fromRow)
  }

  /**
   * Retrieves keywords linked to the given role via the role_keyword junction table.
   * @param {number} roleId - The role identifier.
   * @returns {Keyword[]} Keywords associated with the given role.
   */
  getByRole(roleId: number): Keyword[] {
    const rows = this.db.prepare(`
      SELECT k.* FROM keyword k
      INNER JOIN rolekeyword rk ON rk.id_keyword = k.id_keyword
      WHERE rk.id_role = ?
    `).all(roleId) as KeywordRow[]
    return rows.map(KeywordMapper.fromRow)
  }

  /**
   * Retrieves keywords linked to the given project via the keyword_project junction table.
   * @param {number} projectId - The project identifier.
   * @returns {Keyword[]} Keywords associated with the given project.
   */
  getByProject(projectId: number): Keyword[] {
    const rows = this.db.prepare(`
      SELECT k.* FROM keyword k
      INNER JOIN projectkeyword kp ON kp.id_keyword = k.id_keyword
      WHERE kp.id_project = ?
    `).all(projectId) as KeywordRow[]
    return rows.map(KeywordMapper.fromRow)
  }
}
