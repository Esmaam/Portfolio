import { SkillRepository } from '@/repositories/skill.repository'
import type { Skill } from '@/models/skill.model'

/**
 * Business logic for the Skill entity.
 */
export class SkillService {
  constructor(private readonly repository: SkillRepository) {}

  /**
   * Returns all skills.
   * @returns {Skill[]} All skills.
   */
  getAll(): Skill[] {
    return this.repository.getAll()
  }
}
