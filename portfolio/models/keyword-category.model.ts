/**
 * Represents a category that groups keywords (e.g. Web, IA, Sciences).
 */
export class KeywordCategory {
  constructor(
    public readonly idCategory: number,
    public readonly name:       string,
  ) {}
}
