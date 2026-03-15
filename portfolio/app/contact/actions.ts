'use server'

import { ownerController } from '@/controllers/owner.controller'
import { ContactService, type ContactFormData } from '@/services/contact.service'
import { NodemailerEmailSender } from '@/lib/email-sender'

export type ContactActionResult = {
  success: boolean
  error?:  string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates the raw form data and returns typed ContactFormData or an error message.
 * @param {FormData} formData - The raw form submission.
 * @returns {{ data: ContactFormData } | { error: string }} Parsed data or a validation error.
 */
function parseFormData(formData: FormData): { data: ContactFormData } | { error: string } {
  const name    = formData.get('name')?.toString().trim()    ?? ''
  const email   = formData.get('email')?.toString().trim()   ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  if (!name || !email || !message) {
    return { error: 'Tous les champs sont obligatoires.' }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: 'Adresse e-mail invalide.' }
  }

  return { data: { name, email, message } }
}

/**
 * Server Action — validates the contact form and sends an email to the portfolio owner.
 * The recipient address is read from the Owner record in the database.
 * @param {ContactActionResult | null} _prevState - Previous action state (required by useActionState).
 * @param {FormData} formData - The raw form submission.
 * @returns {Promise<ContactActionResult>} Success flag and optional error message.
 */
export async function sendContactEmailAction(
  _prevState: ContactActionResult | null,
  formData:   FormData,
): Promise<ContactActionResult> {
  const parsed = parseFormData(formData)

  if ('error' in parsed) {
    return { success: false, error: parsed.error }
  }

  const owner = ownerController.getOwner()
  const contactService = new ContactService(new NodemailerEmailSender())

  try {
    await contactService.sendMessage(parsed.data, owner.email)
    return { success: true }
  } catch {
    return { success: false, error: "Une erreur est survenue. Réessayez plus tard." }
  }
}
