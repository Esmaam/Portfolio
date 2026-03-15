import { EducationRepository } from '@/repositories/education.repository'
import type { Education } from '@/models/education.model'

/**
 * Business logic for the Education entity.
 */
export class EducationService {
  constructor(private readonly repository: EducationRepository) {}

  /**
   * Returns all education entries.
   * @returns {Promise<Education[]>} All education entries ordered by start date descending.
   */
  async getAll(): Promise<Education[]> {
    return this.repository.getAll()
  }
}
