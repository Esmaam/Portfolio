import { Skill } from '@/models/skill.model'

export type SkillRow = {
  id_skill:    number
  title:       string
  tagline:     string
  description: string
  id_category: number
}

/**
 * Maps raw database rows to Skill model instances.
 */
export class SkillMapper {
  /**
   * Converts a raw database row into a Skill model.
   * @param {SkillRow} row - The raw database row.
   * @returns {Skill} The mapped Skill instance.
   */
  static fromRow(row: SkillRow): Skill {
    return new Skill(row.id_skill, row.title, row.tagline, row.description, row.id_category)
  }
}
