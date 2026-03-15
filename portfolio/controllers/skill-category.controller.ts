import db from '@/lib/database'
import { SkillCategoryRepository } from '@/repositories/skill-category.repository'
import { SkillRepository } from '@/repositories/skill.repository'
import { SkillCategoryService } from '@/services/skill-category.service'
import type { SkillCategoryWithSkills } from '@/services/skill-category.service'
import type { SkillCategory } from '@/models/skill-category.model'

const service = new SkillCategoryService(new SkillCategoryRepository(db), new SkillRepository(db))

/**
 * Orchestrates skill category data retrieval.
 */
export class SkillCategoryController {
  constructor(private readonly service: SkillCategoryService) {}

  /**
   * Returns all skill categories.
   * @returns {SkillCategory[]} All skill categories.
   */
  getAll(): SkillCategory[] {
    return this.service.getAll()
  }

  /**
   * Returns all skill categories enriched with their associated skills.
   * @returns {SkillCategoryWithSkills[]} All categories with their skills.
   */
  getAllWithSkills(): SkillCategoryWithSkills[] {
    return this.service.getAllWithSkills()
  }
}

export const skillCategoryController = new SkillCategoryController(service)
