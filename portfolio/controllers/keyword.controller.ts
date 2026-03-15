import db from '@/lib/database'
import { KeywordRepository } from '@/repositories/keyword.repository'
import { KeywordService } from '@/services/keyword.service'
import type { Keyword } from '@/models/keyword.model'

const service = new KeywordService(new KeywordRepository(db))

/**
 * Orchestrates keyword data retrieval.
 */
export class KeywordController {
  constructor(private readonly service: KeywordService) {}

  /**
   * Returns all keywords.
   * @returns {Promise<Keyword[]>} All keywords.
   */
  async getAll(): Promise<Keyword[]> {
    return this.service.getAll()
  }
}

export const keywordController = new KeywordController(service)
