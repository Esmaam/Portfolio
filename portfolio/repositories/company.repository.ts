import type Database from 'better-sqlite3'
import { Company } from '@/models/company.model'
import { CompanyMapper, type CompanyRow } from '@/mappers/company.mapper'

/**
 * Provides database access for the Company entity.
 */
export class CompanyRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all companies from the database.
   * @returns {Company[]} All companies.
   */
  getAll(): Company[] {
    const rows = this.db.prepare('SELECT * FROM company').all() as CompanyRow[]
    return rows.map(CompanyMapper.fromRow)
  }

  /**
   * Retrieves a company by its identifier.
   * @param {number} id - The company identifier.
   * @returns {Company | undefined} The matching company, or undefined if not found.
   */
  getById(id: number): Company | undefined {
    const row = this.db.prepare('SELECT * FROM company WHERE id_company = ?').get(id) as CompanyRow | undefined
    return row ? CompanyMapper.fromRow(row) : undefined
  }
}
