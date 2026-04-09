import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(email: string, password: string){
    const user = await this.userService.findByEmail(email)

    if(!user){
      throw new NotFoundException("User not found")
    }

    const isPasswordValid = user.data.password === password

    if(!isPasswordValid){
      throw new BadRequestException("Invalid password")
    }

    const payload = { 
      email: user.data.email, 
      sub: user.data.id,
      username: user.data.username
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  } 
}