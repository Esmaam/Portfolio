'use client'

import { useActionState } from 'react'
import { sendContactEmailAction } from '@/app/contact/actions'
import styles from './contact-form.module.css'

/**
 * Contact form with server-side email sending via a Next.js Server Action.
 * Displays a success message on submission and an inline error on failure.
 */
export default function ContactForm() {
  const [result, formAction, isPending] = useActionState(sendContactEmailAction, null)

  if (result?.success) {
    return (
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            Message envoyé ! Je vous répondrai dans les plus brefs délais.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className={styles.section}>
      <h2 className={styles.title}>Envoyer un message.</h2>
      <div className={styles.wrap}>
        {result?.error && (
          <p className={styles.error}>{result.error}</p>
        )}
        <form action={formAction}>
          <div className={styles.row}>
            <input
              className={styles.field}
              type="text"
              name="name"
              placeholder="Nom"
              required
            />
            <input
              className={styles.field}
              type="email"
              name="email"
              placeholder="E-mail"
              required
            />
          </div>
          <textarea
            className={`${styles.field} ${styles.textarea}`}
            name="message"
            placeholder="Message"
            required
          />
          <button className={styles.submit} type="submit" disabled={isPending}>
            {isPending ? 'Envoi en cours…' : 'Envoyer'}
          </button>
        </form>
      </div>
    </section>
  )
}
