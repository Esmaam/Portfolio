import { OwnerRepository } from '@/repositories/owner.repository'
import type { Owner } from '@/models/owner.model'

/**
 * Business logic for the Owner entity.
 */
export class OwnerService {
  constructor(private readonly repository: OwnerRepository) {}

  /**
   * Returns the portfolio owner.
   * @returns {Promise<Owner>} The portfolio owner.
   */
  async getOwner(): Promise<Owner> {
    return this.repository.getOwner()
  }
}
