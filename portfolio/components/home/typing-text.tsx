'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './typing-text.module.css'

type Props = {
  messages: string[]
}

const TYPING_SPEED   = 75
const DELETING_SPEED = 30
const HOLD_DURATION  = 2200
const PAUSE_DURATION = 400

/**
 * Cycles through a list of messages with a typewriter effect.
 * Types each message character by character, holds, then deletes before moving to the next.
 */
export default function TypingText({ messages }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const indexRef    = useRef(0)
  const frameRef    = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (messages.length === 0) return

    function tick() {
      const current = messages[indexRef.current]

      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
          frameRef.current = setTimeout(tick, TYPING_SPEED)
        } else {
          frameRef.current = setTimeout(() => setIsDeleting(true), HOLD_DURATION)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1))
          frameRef.current = setTimeout(tick, DELETING_SPEED)
        } else {
          indexRef.current = (indexRef.current + 1) % messages.length
          setIsDeleting(false)
          frameRef.current = setTimeout(tick, PAUSE_DURATION)
        }
      }
    }

    frameRef.current = setTimeout(tick, TYPING_SPEED)
    return () => { if (frameRef.current) clearTimeout(frameRef.current) }
  }, [displayed, isDeleting, messages])

  return (
    <span>
      {displayed}
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  )
}
