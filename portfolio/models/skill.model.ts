/**
 * Represents a technical or professional skill.
 */
export class Skill {
  constructor(
    public readonly idSkill:      number,
    public readonly title:        string,
    public readonly tagline:      string,
    public readonly description:  string,
    public readonly idCategory:   number,
  ) {}
}
