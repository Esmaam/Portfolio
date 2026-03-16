/**
 * Represents a keyword associated with a role or a project.
 */
export class Keyword {
  constructor(
    public readonly idKeyword:  number,
    public readonly text:       string,
    public readonly idCategory: number | null,
  ) {}
}
