import { Project } from '@/models/project.model'

export type ProjectRow = {
  id_project:   number
  name:         string
  contribution: string
  description:  string
  id_role:      number | null
  position:     number | null
}

/**
 * Maps raw database rows to Project model instances.
 */
export class ProjectMapper {
  /**
   * Converts a raw database row into a Project model.
   * @param {ProjectRow} row - The raw database row.
   * @returns {Project} The mapped Project instance.
   */
  static fromRow(row: ProjectRow): Project {
    return new Project(row.id_project, row.name, row.contribution, row.description, row.id_role, row.position)
  }
}
