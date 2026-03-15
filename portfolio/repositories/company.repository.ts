import type { Client } from '@libsql/client'
import { Company } from '@/models/company.model'
import { CompanyMapper, type CompanyRow } from '@/mappers/company.mapper'

/**
 * Provides database access for the Company entity.
 */
export class CompanyRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all companies from the database.
   * @returns {Promise<Company[]>} All companies.
   */
  async getAll(): Promise<Company[]> {
    const { rows } = await this.db.execute('SELECT * FROM company')
    return (rows as unknown as CompanyRow[]).map(CompanyMapper.fromRow)
  }

  /**
   * Retrieves a company by its identifier.
   * @param {number} id - The company identifier.
   * @returns {Promise<Company | undefined>} The matching company, or undefined if not found.
   */
  async getById(id: number): Promise<Company | undefined> {
    const { rows } = await this.db.execute({
      sql:  'SELECT * FROM company WHERE id_company = ?',
      args: [id],
    })
    const row = rows[0] as unknown as CompanyRow | undefined
    return row ? CompanyMapper.fromRow(row) : undefined
  }
}
