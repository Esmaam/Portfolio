import type Database from 'better-sqlite3'
import { Education } from '@/models/education.model'
import { EducationMapper, type EducationRow } from '@/mappers/education.mapper'

/**
 * Provides database access for the Education entity.
 */
export class EducationRepository {
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all education entries from the database, ordered by start date descending.
   * @returns {Education[]} All education entries.
   */
  getAll(): Education[] {
    const rows = this.db.prepare('SELECT * FROM education ORDER BY start_date DESC').all() as EducationRow[]
    return rows.map(EducationMapper.fromRow)
  }
}
