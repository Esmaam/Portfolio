import type { Client } from '@libsql/client'
import { KeywordCategory } from '@/models/keyword-category.model'
import { KeywordCategoryMapper, type KeywordCategoryRow } from '@/mappers/keyword-category.mapper'

/**
 * Provides database access for the KeywordCategory entity.
 */
export class KeywordCategoryRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all keyword categories.
   * @returns {Promise<KeywordCategory[]>} All categories.
   */
  async getAll(): Promise<KeywordCategory[]> {
    const { rows } = await this.db.execute('SELECT * FROM keywordcategory ORDER BY id_category ASC')
    return (rows as unknown as KeywordCategoryRow[]).map(KeywordCategoryMapper.fromRow)
  }
}
