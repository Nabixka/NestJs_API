import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
import { KnexService } from "src/database/knex.service";

@Injectable()
export class MailService {
    private transporter

    constructor(private knexService: KnexService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
    }

    async sendOtp(email: string, otp: string) {
        const update = await this.knexService.connection("users")
        .where({email})
        .update("otp_code", otp)

        await this.transporter.sendMail({
            from: `"No Reply" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Kode OTP',
            html: `
        <h2>OTP Kamu</h2>
        <p>Kode OTP: <b>${otp}</b></p>
        <p>Berlaku 5 menit</p>
      `,
        })
    }
}