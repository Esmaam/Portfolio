import db from '@/lib/database'
import { EducationRepository } from '@/repositories/education.repository'
import { EducationService } from '@/services/education.service'
import type { Education } from '@/models/education.model'

const service = new EducationService(new EducationRepository(db))

/**
 * Orchestrates education data retrieval.
 */
export class EducationController {
  constructor(private readonly service: EducationService) {}

  /**
   * Returns all education entries.
   * @returns {Education[]} All education entries ordered by start date descending.
   */
  getAll(): Education[] {
    return this.service.getAll()
  }
}

export const educationController = new EducationController(service)
