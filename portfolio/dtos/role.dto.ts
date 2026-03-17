import type { Role } from '@/models/role.model'
import type { Company } from '@/models/company.model'
import type { Keyword } from '@/models/keyword.model'

/** Role with its company and associated keywords — used for the experience section. */
export type RoleWithDetails = {
  role:     Role
  company:  Company
  keywords: Keyword[]
}
