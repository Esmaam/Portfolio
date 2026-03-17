import { RoleRepository } from '@/repositories/role.repository'
import { CompanyRepository } from '@/repositories/company.repository'
import { KeywordRepository } from '@/repositories/keyword.repository'
import type { Role } from '@/models/role.model'
import type { RoleWithDetails } from '@/dtos/role.dto'

export type { RoleWithDetails }

/**
 * Business logic for the Role entity.
 */
export class RoleService {
  constructor(
    private readonly roleRepository:    RoleRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly keywordRepository: KeywordRepository,
  ) {}

  /**
   * Returns all visible roles.
   * @returns {Promise<Role[]>} All roles with visible flag set to true.
   */
  async getVisible(): Promise<Role[]> {
    return this.roleRepository.getVisible()
  }

  /**
   * Returns all visible roles enriched with their company and keywords.
   * @returns {Promise<RoleWithDetails[]>} All visible roles with full details.
   */
  async getVisibleWithDetails(): Promise<RoleWithDetails[]> {
    const roles = await this.roleRepository.getVisible()
    return Promise.all(
      roles.map(async role => ({
        role,
        company:  (await this.companyRepository.getById(role.idCompany))!,
        keywords: await this.keywordRepository.getByRole(role.idRole),
      }))
    )
  }

  /**
   * Returns the most recent visible roles up to the given limit.
   * @param {number} limit - Maximum number of roles to return.
   * @returns {Promise<RoleWithDetails[]>} Featured roles with full details.
   */
  async getFeatured(limit: number): Promise<RoleWithDetails[]> {
    return (await this.getVisibleWithDetails()).slice(0, limit)
  }
}
