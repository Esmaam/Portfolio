import type { Client } from '@libsql/client'
import { SkillCategory } from '@/models/skill-category.model'
import { SkillCategoryMapper, type SkillCategoryRow } from '@/mappers/skill-category.mapper'

/**
 * Provides database access for the SkillCategory entity.
 */
export class SkillCategoryRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all skill categories from the database.
   * @returns {Promise<SkillCategory[]>} All skill categories.
   */
  async getAll(): Promise<SkillCategory[]> {
    const { rows } = await this.db.execute('SELECT * FROM skillcategory')
    return (rows as unknown as SkillCategoryRow[]).map(SkillCategoryMapper.fromRow)
  }
}
