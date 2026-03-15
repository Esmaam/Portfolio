import type { Client } from '@libsql/client'
import { Skill } from '@/models/skill.model'
import { SkillMapper, type SkillRow } from '@/mappers/skill.mapper'

/**
 * Provides database access for the Skill entity.
 */
export class SkillRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all skills from the database.
   * @returns {Promise<Skill[]>} All skills.
   */
  async getAll(): Promise<Skill[]> {
    const { rows } = await this.db.execute('SELECT * FROM skill')
    return (rows as unknown as SkillRow[]).map(SkillMapper.fromRow)
  }

  /**
   * Retrieves all skills belonging to the given category.
   * @param {number} categoryId - The category identifier.
   * @returns {Promise<Skill[]>} Skills matching the given category.
   */
  async getByCategory(categoryId: number): Promise<Skill[]> {
    const { rows } = await this.db.execute({
      sql:  'SELECT * FROM skill WHERE id_category = ?',
      args: [categoryId],
    })
    return (rows as unknown as SkillRow[]).map(SkillMapper.fromRow)
  }
}
