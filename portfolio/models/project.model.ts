/**
 * Represents a project associated with a role.
 */
export class Project {
  constructor(
    public readonly idProject:     number,
    public readonly name:          string,
    public readonly contribution:  string,
    public readonly description:   string,
    public readonly idRole:        number | null,
    public readonly position:      number | null,
  ) {}
}
