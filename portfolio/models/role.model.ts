/**
 * Represents a professional role held at a company.
 */
export class Role {
  constructor(
    public readonly idRole:       number,
    public readonly title:        string,
    public readonly tagline:      string,
    public readonly description:  string,
    public readonly city:         string,
    public readonly startDate:    string,
    public readonly endDate:      string | null,
    public readonly visible:      boolean,
    public readonly idCompany:    number,
  ) {}
}
