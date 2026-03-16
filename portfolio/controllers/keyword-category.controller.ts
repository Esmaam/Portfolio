import db from '@/lib/database'
import { KeywordCategoryRepository } from '@/repositories/keyword-category.repository'
import { KeywordCategoryService } from '@/services/keyword-category.service'
import type { KeywordCategory } from '@/models/keyword-category.model'

const service = new KeywordCategoryService(new KeywordCategoryRepository(db))

/**
 * Orchestrates keyword category data retrieval.
 */
export class KeywordCategoryController {
  constructor(private readonly service: KeywordCategoryService) {}

  /**
   * Returns all keyword categories.
   * @returns {Promise<KeywordCategory[]>} All categories.
   */
  async getAll(): Promise<KeywordCategory[]> {
    return this.service.getAll()
  }
}

export const keywordCategoryController = new KeywordCategoryController(service)
