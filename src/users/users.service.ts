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
      'token',
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

  async getSummary(user: any){
    if(user.role === 'Admin'){
      const users = await this.knexService.connection('users').select('id', 'username', 'email', 'role', 'status');
      const items = await this.knexService.connection('items').select('*');
      return {
        profil: user,
        listUser: users,
        listItem: items
      }
    } else {
      const result = await this.knexService.connection('users as u')
      .leftJoin('items as i', 'i.user_id', 'u.id')
      .where('u.id', user.id)
      .groupBy('u.id', 'u.username', 'u.email', 'u.role')
      .select(
        'u.id',
        'u.username',
        'u.email',
        'u.role'
      )
      .count({
        found_item: this.knexService.connection.raw(
          "CASE WHEN i.status = 'found' THEN 1 END"
        ),
        lost_item: this.knexService.connection.raw(
          "CASE WHEN i.status = 'lost' THEN 1 END"
        )
      });

      return result[0]
    }
  }
}