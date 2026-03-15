import { SkillRepository } from '@/repositories/skill.repository'
import type { Skill } from '@/models/skill.model'

/**
 * Business logic for the Skill entity.
 */
export class SkillService {
  constructor(private readonly repository: SkillRepository) {}

  /**
   * Returns all skills.
   * @returns {Promise<Skill[]>} All skills.
   */
  async getAll(): Promise<Skill[]> {
    return this.repository.getAll()
  }
}
