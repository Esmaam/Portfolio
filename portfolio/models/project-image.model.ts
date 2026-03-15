/**
 * Represents an image associated with a project.
 */
export class ProjectImage {
  constructor(
    public readonly idImage:   number,
    public readonly filename:  string,
    public readonly idProject: number,
  ) {}
}
