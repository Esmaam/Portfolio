import { KeywordCategoryRepository } from '@/repositories/keyword-category.repository'
import type { KeywordCategory } from '@/models/keyword-category.model'

/**
 * Business logic for the KeywordCategory entity.
 */
export class KeywordCategoryService {
  constructor(private readonly repository: KeywordCategoryRepository) {}

  /**
   * Returns all keyword categories.
   * @returns {Promise<KeywordCategory[]>} All categories.
   */
  async getAll(): Promise<KeywordCategory[]> {
    return this.repository.getAll()
  }
}
