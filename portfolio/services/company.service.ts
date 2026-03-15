import { CompanyRepository } from '@/repositories/company.repository'
import type { Company } from '@/models/company.model'

/**
 * Business logic for the Company entity.
 */
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

  /**
   * Returns all companies.
   * @returns {Company[]} All companies.
   */
  getAll(): Company[] {
    return this.repository.getAll()
  }

  /**
   * Returns the company matching the given identifier.
   * @param {number} id - The company identifier.
   * @returns {Company | undefined} The matching company, or undefined if not found.
   */
  getById(id: number): Company | undefined {
    return this.repository.getById(id)
  }
}
