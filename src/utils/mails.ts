import { EmailOptions } from '../interfaces/email-options.interface';
import config from '../config/config';
import nodeMailer from 'nodemailer';

export class MailMangement {
  private initalizeMail() {
    return nodeMailer.createTransport({
      host: config.emails.host,
      port: +config.emails.port, // if secure false port = 587, if true port= 465
      auth: {
        user: config.emails.username,
        pass: config.emails.password,
      },
    });
  }

  private async sendEmail(mailOptions: EmailOptions): Promise<void> {
    const transpoter = this.initalizeMail();
    await transpoter.sendMail({
      from: 'ecommerce@gmail.com',
      to: mailOptions.email,
      subject: mailOptions.subject,
      text: mailOptions.text,
    });
  }

  async sendVerifyEmailCode(email: string, code: string): Promise<string> {
    await this.sendEmail({
      email,
      subject: 'send verify email Code',
      text: `your verify code is ${code}`,
    });
    return 'code is send to your email please check your inbox, code will expire after 30 minutes';
  }

  async sendResetPasswordCode(email: string, code: string): Promise<string> {
    await this.sendEmail({
      email,
      subject: 'send reset Code',
      text: `you asked to reset your code this is the code to reset your password ${code}`,
    });
    return 'code is send to your email please check your inbox, code will expire after 30 minutes';
  }
}
