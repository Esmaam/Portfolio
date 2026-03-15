import { HeroMessage } from '@/models/hero-message.model'

export type HeroMessageRow = {
  id_message: number
  text:       string
}

/**
 * Maps raw database rows to HeroMessage model instances.
 */
export class HeroMessageMapper {
  /**
   * Converts a raw database row into a HeroMessage model.
   * @param {HeroMessageRow} row - The raw database row.
   * @returns {HeroMessage} The mapped HeroMessage instance.
   */
  static fromRow(row: HeroMessageRow): HeroMessage {
    return new HeroMessage(row.id_message, row.text)
  }
}
