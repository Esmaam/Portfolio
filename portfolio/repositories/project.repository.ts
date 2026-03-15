import type Database from 'better-sqlite3'
import { Project } from '@/models/project.model'
import { ProjectMapper, type ProjectRow } from '@/mappers/project.mapper'

/**
 * Provides database access for the Project entity.
 */
export class ProjectRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all projects from the database.
   * @returns {Project[]} All projects.
   */
  getAll(): Project[] {
    const rows = this.db.prepare('SELECT * FROM project').all() as ProjectRow[]
    return rows.map(ProjectMapper.fromRow)
  }

  /**
   * Retrieves all projects associated with the given role.
   * @param {number} roleId - The role identifier.
   * @returns {Project[]} Projects linked to the given role.
   */
  getByRole(roleId: number): Project[] {
    const rows = this.db.prepare('SELECT * FROM project WHERE id_role = ?').all(roleId) as ProjectRow[]
    return rows.map(ProjectMapper.fromRow)
  }
}
