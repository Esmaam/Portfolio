import type { Client } from '@libsql/client'
import { ProjectImage } from '@/models/project-image.model'
import { ProjectImageMapper, type ProjectImageRow } from '@/mappers/project-image.mapper'

/**
 * Provides database access for the ProjectImage entity.
 */
export class ProjectImageRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all images associated with the given project.
   * @param {number} projectId - The project identifier.
   * @returns {Promise<ProjectImage[]>} Images linked to the given project.
   */
  async getByProject(projectId: number): Promise<ProjectImage[]> {
    const { rows } = await this.db.execute({
      sql:  'SELECT * FROM ProjectImage WHERE id_project = ?',
      args: [projectId],
    })
    return (rows as unknown as ProjectImageRow[]).map(ProjectImageMapper.fromRow)
  }
}
