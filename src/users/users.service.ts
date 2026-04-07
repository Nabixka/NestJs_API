import { Injectable } from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class UsersService {
  constructor(private knexService: KnexService) {}

  async findAll(){
    return this.knexService.connection('users').select('*')
  }

  async findOne(id: number){
    return this.knexService.connection('users')
    .where({id})
    .first()
  }

  async create(data: {username: string, email: string, password: string}){
    const [user] = await this.knexService.connection('users')
    .insert(data)
    .returning('*')

    return user
  }

  async update(id: number, data: {username: string, email: string, password: string}){
    return this.knexService.connection('users')
    .where({ id })
    .update(data)
    .returning('*')

  }

  async remove(id: number){
    return this.knexService.connection('users')
    .where({ id })
    .del()
  }
}
