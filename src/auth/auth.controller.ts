import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './Auth.Guard';
import { AuthService } from './auth.service';
import { ValidateUserFormPipe } from 'src/pipes/validate_user_form.pipe';
import { ValidateEmailExist } from 'src/pipes/validate_email_exist.pipe';
import { MailService } from 'src/auth/gmail.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private mailSerivce: MailService) {}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() data: {email: string, password: string} ){
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        await this.mailSerivce.sendOtp(data.email, otp)

        return this.authService.login(data)
    }

    @Post('/verify-otp')
    @HttpCode(200)
    verify(@Body() data: {email: string, otp: string}){
        return this.authService.verifyOtp(data)
    }

    @Post('/register')
    register(@Body(ValidateUserFormPipe, ValidateEmailExist) data: {username: string, email: string, password: string, role: string}){
        return this.authService.register(data)
    }
    
}
