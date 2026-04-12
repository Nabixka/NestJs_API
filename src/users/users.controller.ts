import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidateUserFormPipe } from 'src/pipes/validate_user_form.pipe';
import { ValidateUserExist } from 'src/pipes/validate_user_exist.pipe';
import { ValidateEmailExist } from 'src/pipes/validate_email_exist.pipe';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Get All
  @Get()
  getAll() {
    return this.usersService.findAll()
  }

  // Get User Profil
  @Get('/profil')
  @UseGuards(JwtAuthGuard)
  profil(@Req() req) {
    return {
      message: "success",
      data: req.user
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
