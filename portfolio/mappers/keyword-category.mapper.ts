import { KeywordCategory } from '@/models/keyword-category.model'

export type KeywordCategoryRow = {
  id_category: number
  name:        string
}

/**
 * Maps raw database rows to KeywordCategory model instances.
 */
export class KeywordCategoryMapper {
  static fromRow(row: KeywordCategoryRow): KeywordCategory {
    return new KeywordCategory(row.id_category, row.name)
  }
}
