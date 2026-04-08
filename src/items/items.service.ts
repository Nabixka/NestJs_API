import { Injectable } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";
import { mapItem } from "./helper/itemMap"

@Injectable()
export class ItemsService{
  constructor(private knexService: KnexService) {}

  async getAll(){
      const items = await this.knexService.connection('items')
      .join('users', 'user_id', 'users.id')
      .select(
        'items.*',
        'users.id as user_id',
        'users.username as username'
      )

      return {
        message: "success",
        data: items.map(mapItem)
      }
  }

  async getOne(id: number){
      return this.knexService.connection('items')
      .where({ id })
      .first()
  }

  async create(data: {id: string, title: string, location: string, image: string, category: string, description: string}){
    const item = await this.knexService.connection('items')
    .insert(data)
    .returning("*")
  }

  async delete(id: number){
      return this.knexService.connection('items')
      .where({ id })
      .del()
  } 
}