import type { Client } from '@libsql/client'
import { Education } from '@/models/education.model'
import { EducationMapper, type EducationRow } from '@/mappers/education.mapper'

/**
 * Provides database access for the Education entity.
 */
export class EducationRepository {
  constructor(private readonly db: Client) {}

  /**
   * Retrieves all education entries from the database, ordered by start date descending.
   * @returns {Promise<Education[]>} All education entries.
   */
  async getAll(): Promise<Education[]> {
    const { rows } = await this.db.execute('SELECT * FROM education ORDER BY start_date DESC')
    return (rows as unknown as EducationRow[]).map(EducationMapper.fromRow)
  }
}
