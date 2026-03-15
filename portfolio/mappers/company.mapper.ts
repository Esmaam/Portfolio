import { Company } from '@/models/company.model'

export type CompanyRow = {
  id_company: number
  name:       string
}

/**
 * Maps raw database rows to Company model instances.
 */
export class CompanyMapper {
  /**
   * Converts a raw database row into a Company model.
   * @param {CompanyRow} row - The raw database row.
   * @returns {Company} The mapped Company instance.
   */
  static fromRow(row: CompanyRow): Company {
    return new Company(row.id_company, row.name)
  }
}
