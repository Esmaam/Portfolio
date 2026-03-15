import db from '@/lib/database'
import { CompanyRepository } from '@/repositories/company.repository'
import { CompanyService } from '@/services/company.service'
import type { Company } from '@/models/company.model'

const service = new CompanyService(new CompanyRepository(db))

/**
 * Orchestrates company data retrieval.
 */
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  /**
   * Returns all companies.
   * @returns {Promise<Company[]>} All companies.
   */
  async getAll(): Promise<Company[]> {
    return this.service.getAll()
  }

  /**
   * Returns the company matching the given identifier.
   * @param {number} id - The company identifier.
   * @returns {Promise<Company | undefined>} The matching company, or undefined if not found.
   */
  async getById(id: number): Promise<Company | undefined> {
    return this.service.getById(id)
  }
}

export const companyController = new CompanyController(service)
