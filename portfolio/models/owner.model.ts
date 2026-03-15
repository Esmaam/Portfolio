/**
 * Represents the portfolio owner.
 */
export class Owner {
  constructor(
    public readonly idOwner:             number,
    public readonly firstName:           string,
    public readonly lastName:            string,
    public readonly email:               string,
    public readonly linkedinProfileUrl:  string | null,
  ) {}
}
