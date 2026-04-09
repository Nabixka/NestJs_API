import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class UsersService {
  constructor(private knexService: KnexService) {}

  // Get All User
  async findAll(){
    const users = await this.knexService.connection('users').select('*')

    return {
      message: "success",
      data: users
    }
  }

  // Get One User
  async findOne(id: number){
    const user = await this.knexService.connection('users')
    .where({id})
    .first()

    return {
      message: "success",
      data: user
    }
  }

  // Register
  async register(data: {username: string, email: string, password: string}){
    const [user] = await this.knexService.connection('users')
    .insert(data)
    .returning('*')

    return {
      message: "success",
      data: user
    }
  }

  // Update Password
  async update(id: number, data: {email: string, password: string}){
    const user = await this.knexService.connection('users')
    .where({ id })
    .update(data)
    .returning('*')

    return {
      message: "success",
      data: user
    }
  }

  // Delete 
  async remove(id: number){
    const del = await this.knexService.connection('users')
    .where({ id })
    .del()

    return {
      message: "success"
    }
  }

  async findByEmail(email: string){
    const user = await this.knexService.connection('users')
    .where({ email })
    .first() 
    return {
      message: "success",
      data: user
    }
  }
}
