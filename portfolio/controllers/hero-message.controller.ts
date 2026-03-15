import db from '@/lib/database'
import { HeroMessageRepository } from '@/repositories/hero-message.repository'
import { HeroMessageService } from '@/services/hero-message.service'
import type { HeroMessage } from '@/models/hero-message.model'

const service = new HeroMessageService(new HeroMessageRepository(db))

/**
 * Orchestrates hero message data retrieval.
 */
export class HeroMessageController {
  constructor(private readonly service: HeroMessageService) {}

  /**
   * Returns all hero messages.
   * @returns {Promise<HeroMessage[]>} All hero messages.
   */
  async getAll(): Promise<HeroMessage[]> {
    return this.service.getAll()
  }
}

export const heroMessageController = new HeroMessageController(service)
