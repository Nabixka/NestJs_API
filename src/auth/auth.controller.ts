import { Controller, HttpCode, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserFormPipe } from 'src/pipes/validate_user_form.pipe';
import { ValidateEmailExist } from 'src/pipes/validate_email_exist.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @HttpCode(200)
  login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password)
  }

  @Post('/register') 
  register(@Body(ValidateUserFormPipe, ValidateEmailExist) body: {email: string, username: string, password: string}){
    return this.authService.register(body)
  }

  @Put('/forgot')
  forgot(@Body() body: {email: string, password: string}){
    return this.authService.forget(body)
  }
}
