import type { Role } from '@/models/role.model'
import type { Company } from '@/models/company.model'
import type { Keyword } from '@/models/keyword.model'

export type RoleWithDetails = {
  role:     Role
  company:  Company
  keywords: Keyword[]
}
