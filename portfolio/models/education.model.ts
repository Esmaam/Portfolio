/**
 * Represents an education entry (degree, establishment, dates).
 */
export class Education {
  constructor(
    public readonly idEducation:   number,
    public readonly establishment: string,
    public readonly degree:        string,
    public readonly startDate:     string,
    public readonly endDate:       string | null,
  ) {}
}
