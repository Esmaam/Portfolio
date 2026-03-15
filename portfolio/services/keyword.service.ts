import { KeywordRepository } from '@/repositories/keyword.repository'
import type { Keyword } from '@/models/keyword.model'

/**
 * Business logic for the Keyword entity.
 */
export class KeywordService {
  constructor(private readonly repository: KeywordRepository) {}

  /**
   * Returns all keywords.
   * @returns {Keyword[]} All keywords.
   */
  getAll(): Keyword[] {
    return this.repository.getAll()
  }
}
