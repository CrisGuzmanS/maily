import nodemailer from 'nodemailer'
import { env } from 'arrowy-env';
import fs from 'fs';
import handlebars from 'handlebars';

const transporter = nodemailer.createTransport({
    host: env('MAIL_HOST'),
    port: env('MAIL_PORT'),
    secure: true,
    auth: {
        user: env('MAIL_FROM'),
        pass: env('MAIL_PASSWORD')
    },
    tls: { rejectUnauthorized: false }
});
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

/**
 * @example
 * ```js
 * Mail.from('cristian.guzman.contacto@gmail.com')
 *   .to('cristianguzmansuarez@gmail.com')
 *   .subject('Mi asunto')
 *   .content('<h1>prueba Email</h1>')
 *   .send()
 * ```
 */
export class Mail {

    constructor(sender) {
        this.theSender = sender
        this.theAttachments = []
    }

    static from(sender) {
        return new Mail(sender)
    }

    to(recipient) {
        this.theRecipient = recipient
        return this;
    }

    subject(subject) {
        this.theSubject = subject
        return this;
    }

    content(content) {
        this.theContent = content
        return this
    }

    onError(error) {
        throw error
    }

    attachments(attachments = []) {
        this.theAttachments = attachments
        return this
    }

    onSuccess(info) {
        console.log('Correo enviado: ' + info.response)
    }

    data(data) {
        this.theData = data
        return this
    }

    cc(cc) {
        this.theCc = cc
        return this
    }

    bcc(bcc) {
        this.theBcc = bcc
        return this
    }

    html(html) {
        this.theHtml = html
        return this
    }

    send() {

        if (this.theHtml) {
            let htmlFile = fs.readFileSync(this.theHtml, 'utf-8');
            htmlFile = handlebars.compile(htmlFile)(this.theData);
            this.content(htmlFile);
        }

        const mailOptions = {
            from: env('MAIL_FROM'),
            to: this.theRecipient,
            cc: this.theCc,
            bcc: this.theBcc,
            subject: this.theSubject,
            html: this.theContent,
            attachments: this.theAttachments
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                this.onError(error);
            } else {
                this.onSuccess(info);
            }
        });
    }
}