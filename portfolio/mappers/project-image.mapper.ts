import { ProjectImage } from '@/models/project-image.model'

export type ProjectImageRow = {
  id_image:   number
  filename:   string
  id_project: number
}

/**
 * Maps raw database rows to ProjectImage model instances.
 */
export class ProjectImageMapper {
  /**
   * Converts a raw database row into a ProjectImage model.
   * @param {ProjectImageRow} row - The raw database row.
   * @returns {ProjectImage} The mapped ProjectImage instance.
   */
  static fromRow(row: ProjectImageRow): ProjectImage {
    return new ProjectImage(row.id_image, row.filename, row.id_project)
  }
}
