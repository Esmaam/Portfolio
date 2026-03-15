import { ProjectRepository } from '@/repositories/project.repository'
import { KeywordRepository } from '@/repositories/keyword.repository'
import { ProjectImageRepository } from '@/repositories/project-image.repository'
import type { Project } from '@/models/project.model'
import type { Keyword } from '@/models/keyword.model'
import type { ProjectImage } from '@/models/project-image.model'

export type ProjectWithKeywords = {
  project:  Project
  keywords: Keyword[]
}

export type ProjectWithDetails = {
  project:  Project
  keywords: Keyword[]
  images:   ProjectImage[]
}

/**
 * Business logic for the Project entity.
 */
export class ProjectService {
  constructor(
    private readonly projectRepository:      ProjectRepository,
    private readonly keywordRepository:      KeywordRepository,
    private readonly projectImageRepository: ProjectImageRepository,
  ) {}

  /**
   * Returns all projects.
   * @returns {Promise<Project[]>} All projects.
   */
  async getAll(): Promise<Project[]> {
    return this.projectRepository.getAll()
  }

  /**
   * Returns all projects enriched with their associated keywords.
   * @returns {Promise<ProjectWithKeywords[]>} All projects with their keywords.
   */
  async getAllWithKeywords(): Promise<ProjectWithKeywords[]> {
    const projects = await this.projectRepository.getAll()
    return Promise.all(
      projects.map(async project => ({
        project,
        keywords: await this.keywordRepository.getByProject(project.idProject),
      }))
    )
  }

  /**
   * Returns all projects enriched with their keywords and images.
   * @returns {Promise<ProjectWithDetails[]>} All projects with full details.
   */
  async getAllWithDetails(): Promise<ProjectWithDetails[]> {
    const projects = await this.projectRepository.getAll()
    return Promise.all(
      projects.map(async project => ({
        project,
        keywords: await this.keywordRepository.getByProject(project.idProject),
        images:   await this.projectImageRepository.getByProject(project.idProject),
      }))
    )
  }
}
