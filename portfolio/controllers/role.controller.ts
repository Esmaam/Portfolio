import db from '@/lib/database'
import { RoleRepository } from '@/repositories/role.repository'
import { CompanyRepository } from '@/repositories/company.repository'
import { KeywordRepository } from '@/repositories/keyword.repository'
import { RoleService } from '@/services/role.service'
import type { Role } from '@/models/role.model'
import type { RoleWithDetails } from '@/services/role.service'

const service = new RoleService(
  new RoleRepository(db),
  new CompanyRepository(db),
  new KeywordRepository(db),
)

/**
 * Orchestrates role data retrieval.
 */
export class RoleController {
  constructor(private readonly service: RoleService) {}

  /**
   * Returns all visible roles.
   * @returns {Promise<Role[]>} All roles with visible flag set to true.
   */
  async getVisible(): Promise<Role[]> {
    return this.service.getVisible()
  }

  /**
   * Returns all visible roles enriched with their company and keywords.
   * @returns {Promise<RoleWithDetails[]>} All visible roles with full details.
   */
  async getVisibleWithDetails(): Promise<RoleWithDetails[]> {
    return this.service.getVisibleWithDetails()
  }

  /**
   * Returns the most recent visible roles up to the given limit.
   * @param {number} limit - Maximum number of roles to return.
   * @returns {Promise<RoleWithDetails[]>} Featured roles with full details.
   */
  async getFeatured(limit: number): Promise<RoleWithDetails[]> {
    return this.service.getFeatured(limit)
  }
}

export const roleController = new RoleController(service)
