import db from '@/lib/database'
import { OwnerRepository } from '@/repositories/owner.repository'
import { OwnerService } from '@/services/owner.service'
import type { Owner } from '@/models/owner.model'

const service = new OwnerService(new OwnerRepository(db))

/**
 * Orchestrates owner-related data retrieval.
 */
export class OwnerController {
  constructor(private readonly service: OwnerService) {}

  /**
   * Returns the portfolio owner.
   * @returns {Owner} The portfolio owner.
   */
  getOwner(): Owner {
    return this.service.getOwner()
  }
}

export const ownerController = new OwnerController(service)
