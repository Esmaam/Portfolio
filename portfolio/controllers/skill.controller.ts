import db from '@/lib/database'
import { SkillRepository } from '@/repositories/skill.repository'
import { SkillService } from '@/services/skill.service'
import type { Skill } from '@/models/skill.model'

const service = new SkillService(new SkillRepository(db))

/**
 * Orchestrates skill data retrieval.
 */
export class SkillController {
  constructor(private readonly service: SkillService) {}

  /**
   * Returns all skills.
   * @returns {Skill[]} All skills.
   */
  getAll(): Skill[] {
    return this.service.getAll()
  }
}

export const skillController = new SkillController(service)
