import { SkillCategory } from '@/models/skill-category.model'

export type SkillCategoryRow = {
  id_category: number
  title:       string
}

/**
 * Maps raw database rows to SkillCategory model instances.
 */
export class SkillCategoryMapper {
  /**
   * Converts a raw database row into a SkillCategory model.
   * @param {SkillCategoryRow} row - The raw database row.
   * @returns {SkillCategory} The mapped SkillCategory instance.
   */
  static fromRow(row: SkillCategoryRow): SkillCategory {
    return new SkillCategory(row.id_category, row.title)
  }
}
