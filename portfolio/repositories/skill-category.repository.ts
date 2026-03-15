import type Database from 'better-sqlite3'
import { SkillCategory } from '@/models/skill-category.model'
import { SkillCategoryMapper, type SkillCategoryRow } from '@/mappers/skill-category.mapper'

/**
 * Provides database access for the SkillCategory entity.
 */
export class SkillCategoryRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all skill categories from the database.
   * @returns {SkillCategory[]} All skill categories.
   */
  getAll(): SkillCategory[] {
    const rows = this.db.prepare('SELECT * FROM skillcategory').all() as SkillCategoryRow[]
    return rows.map(SkillCategoryMapper.fromRow)
  }
}
