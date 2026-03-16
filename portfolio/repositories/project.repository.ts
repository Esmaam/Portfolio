import type { Client } from '@libsql/client'
import { Project } from '@/models/project.model'
import { ProjectMapper, type ProjectRow } from '@/mappers/project.mapper'

/**
 * Provides database access for the Project entity.
 */
export class ProjectRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all projects from the database.
   * @returns {Promise<Project[]>} All projects.
   */
  async getAll(): Promise<Project[]> {
    const { rows } = await this.db.execute('SELECT * FROM project ORDER BY position ASC NULLS LAST')
    return (rows as unknown as ProjectRow[]).map(ProjectMapper.fromRow)
  }

  /**
   * Retrieves all projects associated with the given role.
   * @param {number} roleId - The role identifier.
   * @returns {Promise<Project[]>} Projects linked to the given role.
   */
  async getByRole(roleId: number): Promise<Project[]> {
    const { rows } = await this.db.execute({
      sql:  'SELECT * FROM project WHERE id_role = ? ORDER BY position ASC NULLS LAST',
      args: [roleId],
    })
    return (rows as unknown as ProjectRow[]).map(ProjectMapper.fromRow)
  }
}
