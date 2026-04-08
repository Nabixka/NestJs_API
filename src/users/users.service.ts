import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class UsersService {
  constructor(private knexService: KnexService) {}

  // Get All User
  async findAll(){
    return this.knexService.connection('users').select('*')
  }

  // Get One User
  async findOne(id: number){
    return this.knexService.connection('users')
    .where({id})
    .first()
  }

  // Register
  async register(data: {username: string, email: string, password: string}){
    const [user] = await this.knexService.connection('users')
    .insert(data)
    .returning('*')

    return user
  }

  // Update Password
  async update(id: number, data: {email: string, password: string}){
    return this.knexService.connection('users')
    .where({ id })
    .update(data)
    .returning('*')

  }

  // Delete 
  async remove(id: number){
    return this.knexService.connection('users')
    .where({ id })
    .del()
  }

  // Login
  async login(email: string, password: string){
    const user = await this.knexService.connection('users')
    .where({ email })
    .first()

    if(!email || !password){
      throw new BadRequestException('Isi Form Dengan Benar')
    }

    if(!user){
      throw new NotFoundException('User Tidak Ada')
    }

    delete user.password

    return {
      message: 'Login Berhasil',
      data: user
    }
  }
}
