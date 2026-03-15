import type { IEmailSender } from '@/lib/email-sender'

export type ContactFormData = {
  name:    string
  email:   string
  message: string
}

/**
 * Handles the business logic for sending contact form messages.
 * Depends on IEmailSender, not on a concrete implementation (SOLID – D).
 */
export class ContactService {
  constructor(private readonly emailSender: IEmailSender) {}

  /**
   * Builds and sends a contact email to the portfolio owner.
   * @param {ContactFormData} data - The submitted form data.
   * @param {string} recipientEmail - The owner's email address retrieved from the database.
   */
  async sendMessage(data: ContactFormData, recipientEmail: string): Promise<void> {
    await this.emailSender.send({
      to:      recipientEmail,
      replyTo: data.email,
      subject: `Message de ${data.name} via le portfolio`,
      text:    data.message,
      html:    `<p><strong>De :</strong> ${data.name} (${data.email})</p><p style="white-space:pre-wrap">${data.message}</p>`,
    })
  }
}
