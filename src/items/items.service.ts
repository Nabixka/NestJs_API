import { Injectable, NotFoundException } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";
import { mapItem } from "./helper/itemMap"

@Injectable()
export class ItemsService{
  constructor(private knexService: KnexService) {}

  // Get All
  async getAll(){
      const items = await this.knexService.connection('items')
      .join('users', 'items.user_id', 'users.id')
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

  // Get One
  async getOne(id: number){
      const item = await this.knexService.connection('items')
      .join('users', 'items.user_id', 'users.id')
      .select(
        'items.*',
        'users.id as user_id',
        'users.username as username'
      )
      .where('items.id', id )
      .first()

      return {
        message: "success",
        data: mapItem(item)
      }
  }

  // Create
  async create(data: {
    title: string, 
    location: string, 
    category: string, 
    status: string,
    description: string,
    user_id: number,
    image: string
  }){
    const [item] = await this.knexService.connection('items')
    .insert(data)
    .returning("*")

    const getItem = await this.knexService.connection('items')
    .join('users', 'items.user_id', 'users.id')
    .select(
      'items.*',
      'users.id as users_id',
      'users.username as username'
    )
    .where('items.id', item.id)
    .first()

    return {
      message: "success",
      data: mapItem(getItem)
    }
  }

  async getByUser(user_id){
    const exist = await this.knexService.connection('users')
    .where("id", user_id)
    .first()

    if(!exist) throw new NotFoundException

    const item = await this.knexService.connection('items')
    .where("user_id", user_id)
    .select("*")

    return {
      message: "success",
      data: item.map(mapItem)
    }
  }

  // Delete
  async delete(id: number){
      const del = await this.knexService.connection('items')
      .where({ id })
      .del()

      return {
        message: "success"
      }
  } 
}