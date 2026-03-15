import { EducationRepository } from '@/repositories/education.repository'
import type { Education } from '@/models/education.model'

/**
 * Business logic for the Education entity.
 */
export class EducationService {
  constructor(private readonly repository: EducationRepository) {}

  /**
   * Returns all education entries.
   * @returns {Education[]} All education entries ordered by start date descending.
   */
  getAll(): Education[] {
    return this.repository.getAll()
  }
}
