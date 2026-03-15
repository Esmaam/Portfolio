import type Database from 'better-sqlite3'
import { Skill } from '@/models/skill.model'
import { SkillMapper, type SkillRow } from '@/mappers/skill.mapper'

/**
 * Provides database access for the Skill entity.
 */
export class SkillRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all skills from the database.
   * @returns {Skill[]} All skills.
   */
  getAll(): Skill[] {
    const rows = this.db.prepare('SELECT * FROM skill').all() as SkillRow[]
    return rows.map(SkillMapper.fromRow)
  }

  /**
   * Retrieves all skills belonging to the given category.
   * @param {number} categoryId - The category identifier.
   * @returns {Skill[]} Skills matching the given category.
   */
  getByCategory(categoryId: number): Skill[] {
    const rows = this.db.prepare('SELECT * FROM skill WHERE id_category = ?').all(categoryId) as SkillRow[]
    return rows.map(SkillMapper.fromRow)
  }
}
