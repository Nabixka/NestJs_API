import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(){
    return this.usersService.findAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string){
    return this.usersService.findOne(Number(id))
  }

  @Post()
  create(@Body() body: {username: string, email: string, password: string}){
    return this.usersService.create(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: {username: string, email: string, password: string}){
    return this.usersService.update(Number(id), body)
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.usersService.remove(Number(id))
  }

}
