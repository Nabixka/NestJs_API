import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService, private knexService: KnexService) {}

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

  async register(data: { email: string, username: string, password: string }){
    const [register] = await this.knexService.connection('users')
    .insert(data)
    .returning("*")

    delete register.password

    return {
      message: "success",
      data: register
    }
  }

  async forget(data: {email: string, password: string}){
    const exist = await this.userService.findByEmail(data.email)
    if(!exist){
      throw new NotFoundException("Email Tidak Terdaftar")
    }

    const [update] = await this.knexService.connection("users")
    .where("email", data.email)
    .update("password", data.password)
    .returning("*")

    delete update.password

    return {
      message: "success",
      data: update
    }
  }
}