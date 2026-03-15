import { ProjectRepository } from '@/repositories/project.repository'
import { KeywordRepository } from '@/repositories/keyword.repository'
import type { Project } from '@/models/project.model'
import type { Keyword } from '@/models/keyword.model'

export type ProjectWithKeywords = {
  project:  Project
  keywords: Keyword[]
}

/**
 * Business logic for the Project entity.
 */
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly keywordRepository: KeywordRepository,
  ) {}

  /**
   * Returns all projects.
   * @returns {Project[]} All projects.
   */
  getAll(): Project[] {
    return this.projectRepository.getAll()
  }

  /**
   * Returns all projects enriched with their associated keywords.
   * @returns {ProjectWithKeywords[]} All projects with their keywords.
   */
  getAllWithKeywords(): ProjectWithKeywords[] {
    const projects = this.projectRepository.getAll()
    return projects.map(project => ({
      project,
      keywords: this.keywordRepository.getByProject(project.idProject),
    }))
  }
}
