import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidateUserExist } from 'src/pipes/validate_user_exist.pipe';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthGuard } from 'src/auth/Auth.Guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Get All User
  @Get()
  getAll() {
    return this.usersService.findAll()
  }

  // Get Profil
  @Get('/profil')
  @UseGuards(AuthGuard)
  async getProfil(@Req() req){
    const data = await this.usersService.getSummary(req.user)
    return {
      message: "success",
      data: data
    }
  }

  // Get One
  @Get('/:id')
  getOne(@Param('id', ValidateUserExist) id: string) {
    return this.usersService.findOne(Number(id))
  }

  // Delete
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(Number(id))
  }

}
