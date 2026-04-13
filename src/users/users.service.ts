import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class UsersService {
  constructor(private knexService: KnexService) {}

  // Get All User
  async findAll(){
    const users = await this.knexService.connection('users').select(
      'id',
      'username',
      'nomor',
      'email',
      'otp_code',
      'role',
      'status',
      'otp_expired'
    )

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

    delete user.password 

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

  // Find By Email
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