import type Database from 'better-sqlite3'
import { ProjectImage } from '@/models/project-image.model'
import { ProjectImageMapper, type ProjectImageRow } from '@/mappers/project-image.mapper'

/**
 * Provides database access for the ProjectImage entity.
 */
export class ProjectImageRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all images associated with the given project.
   * @param {number} projectId - The project identifier.
   * @returns {ProjectImage[]} Images linked to the given project.
   */
  getByProject(projectId: number): ProjectImage[] {
    const rows = this.db
      .prepare('SELECT * FROM ProjectImage WHERE id_project = ?')
      .all(projectId) as ProjectImageRow[]
    return rows.map(ProjectImageMapper.fromRow)
  }
}
