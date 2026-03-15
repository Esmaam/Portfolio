import db from '@/lib/database'
import { ProjectRepository } from '@/repositories/project.repository'
import { KeywordRepository } from '@/repositories/keyword.repository'
import { ProjectImageRepository } from '@/repositories/project-image.repository'
import { ProjectService } from '@/services/project.service'
import type { Project } from '@/models/project.model'
import type { ProjectWithKeywords, ProjectWithDetails } from '@/services/project.service'

const service = new ProjectService(
  new ProjectRepository(db),
  new KeywordRepository(db),
  new ProjectImageRepository(db),
)

/**
 * Orchestrates project data retrieval.
 */
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  /**
   * Returns all projects.
   * @returns {Promise<Project[]>} All projects.
   */
  async getAll(): Promise<Project[]> {
    return this.service.getAll()
  }

  /**
   * Returns all projects enriched with their associated keywords.
   * @returns {Promise<ProjectWithKeywords[]>} All projects with their keywords.
   */
  async getAllWithKeywords(): Promise<ProjectWithKeywords[]> {
    return this.service.getAllWithKeywords()
  }

  /**
   * Returns all projects enriched with their keywords and images.
   * @returns {Promise<ProjectWithDetails[]>} All projects with full details.
   */
  async getAllWithDetails(): Promise<ProjectWithDetails[]> {
    return this.service.getAllWithDetails()
  }
}

export const projectController = new ProjectController(service)
