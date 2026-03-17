import type { Project } from '@/models/project.model'
import type { Keyword } from '@/models/keyword.model'
import type { ProjectImage } from '@/models/project-image.model'

/** Project with its associated keywords — used for list views without images. */
export type ProjectWithKeywords = {
  project:  Project
  keywords: Keyword[]
}

/** Project with its keywords and images — used for the full work grid. */
export type ProjectWithDetails = {
  project:  Project
  keywords: Keyword[]
  images:   ProjectImage[]
}
