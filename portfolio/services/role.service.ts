import { RoleRepository } from '@/repositories/role.repository'
import { CompanyRepository } from '@/repositories/company.repository'
import { KeywordRepository } from '@/repositories/keyword.repository'
import type { Role } from '@/models/role.model'
import type { Company } from '@/models/company.model'
import type { Keyword } from '@/models/keyword.model'

export type RoleWithDetails = {
  role:     Role
  company:  Company
  keywords: Keyword[]
}

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
   * @returns {Role[]} All roles with visible flag set to true.
   */
  getVisible(): Role[] {
    return this.roleRepository.getVisible()
  }

  /**
   * Returns all visible roles enriched with their company and keywords.
   * @returns {RoleWithDetails[]} All visible roles with full details.
   */
  getVisibleWithDetails(): RoleWithDetails[] {
    const roles = this.roleRepository.getVisible()
    return roles.map(role => ({
      role,
      company:  this.companyRepository.getById(role.idCompany)!,
      keywords: this.keywordRepository.getByRole(role.idRole),
    }))
  }

  /**
   * Returns the most recent visible roles up to the given limit.
   * @param {number} limit - Maximum number of roles to return.
   * @returns {RoleWithDetails[]} Featured roles with full details.
   */
  getFeatured(limit: number): RoleWithDetails[] {
    return this.getVisibleWithDetails().slice(0, limit)
  }
}
