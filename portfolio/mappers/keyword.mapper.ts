import { Keyword } from '@/models/keyword.model'

export type KeywordRow = {
  id_keyword: number
  text:       string
}

/**
 * Maps raw database rows to Keyword model instances.
 */
export class KeywordMapper {
  /**
   * Converts a raw database row into a Keyword model.
   * @param {KeywordRow} row - The raw database row.
   * @returns {Keyword} The mapped Keyword instance.
   */
  static fromRow(row: KeywordRow): Keyword {
    return new Keyword(row.id_keyword, row.text)
  }
}
