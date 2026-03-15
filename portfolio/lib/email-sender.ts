import nodemailer from 'nodemailer'

export type EmailOptions = {
  to:      string
  replyTo: string
  subject: string
  text:    string
  html:    string
}

/**
 * Contract for any email sending implementation.
 * Depends on abstraction, not on a concrete transport (SOLID – D).
 */
export interface IEmailSender {
  /**
   * Sends an email with the given options.
   * @param {EmailOptions} options - The email content and addressing options.
   */
  send(options: EmailOptions): Promise<void>
}

/**
 * Sends emails via SMTP using nodemailer.
 * Reads SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS from environment variables.
 */
export class NodemailerEmailSender implements IEmailSender {
  private readonly transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  /**
   * Sends an email via the configured SMTP transport.
   * @param {EmailOptions} options - The email content and addressing options.
   */
  async send(options: EmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text:    options.text,
      html:    options.html,
    })
  }
}
