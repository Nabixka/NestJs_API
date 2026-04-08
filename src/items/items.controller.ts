import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll(){
    return this.itemsService.getAll()
  }

  @Post()
  create(@Body() data: {id: string, title: string, location: string, image: string, category: string, description: string}){
    return this.itemsService.create(data)
  }
}
