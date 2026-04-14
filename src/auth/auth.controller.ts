import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './Auth.Guard';
import { AuthService } from './auth.service';
import { ValidateUserFormPipe } from 'src/pipes/validate_user_form.pipe';
import { ValidateEmailExist } from 'src/pipes/validate_email_exist.pipe';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() data: {email: string, password: string} ){
        return this.authService.login(data)
    }

    @Post('/register')
    register(@Body(ValidateUserFormPipe, ValidateEmailExist) data: {username: string, email: string, password: string, role: string}){
        return this.authService.register(data)
    }
    
}
