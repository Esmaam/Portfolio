import { Education } from '@/models/education.model'

export type EducationRow = {
  id_education:  number
  establishment: string
  degree:        string
  start_date:    string
  end_date:      string | null
}

/**
 * Maps raw database rows to Education model instances.
 */
export class EducationMapper {
  /**
   * Converts a raw database row into an Education model.
   * @param {EducationRow} row - The raw database row.
   * @returns {Education} The mapped Education instance.
   */
  static fromRow(row: EducationRow): Education {
    return new Education(row.id_education, row.establishment, row.degree, row.start_date, row.end_date)
  }
}
