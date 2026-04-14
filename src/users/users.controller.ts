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
  @UseGuards(AuthGuard, new RoleGuard(['Admin, Member']))
  getAll(@Req() req) {
    return this.usersService.findAll()
  }

  // Get Profil
  @Get('/profil')
  @UseGuards(AuthGuard)
  getProfil(@Req() req){
    return {
      message: "success",
      data: req.user
    }
  }

  // Get One
  @Get('/:id')
  @UseGuards(AuthGuard, new RoleGuard(['Admin']))
  getOne(@Param('id', ValidateUserExist) id: string, @Req() req) {
    return this.usersService.findOne(Number(id))
  }

  // Delete
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(Number(id))
  }

}
