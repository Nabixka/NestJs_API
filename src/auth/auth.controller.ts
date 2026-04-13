import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './Auth.Guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() data: {email: string, password: string} ){
        return this.authService.login(data)
    }

    @Post('/register')
    register(@Body() data: {username: string, email: string, password: string, role: string}){
        return this.authService.register(data)
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req) {
        return req.user;
    }
}
