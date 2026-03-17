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
