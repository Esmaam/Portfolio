import { HeroMessageRepository } from '@/repositories/hero-message.repository'
import type { HeroMessage } from '@/models/hero-message.model'

/**
 * Business logic for the HeroMessage entity.
 */
export class HeroMessageService {
  constructor(private readonly repository: HeroMessageRepository) {}

  /**
   * Returns all hero messages.
   * @returns {HeroMessage[]} All hero messages.
   */
  getAll(): HeroMessage[] {
    return this.repository.getAll()
  }
}
