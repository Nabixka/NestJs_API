import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ValidateItemExist } from 'src/pipes/validate_item_exist.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AuthGuard } from 'src/auth/Auth.Guard';

@Controller('item')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll(){
    return this.itemsService.getAll()
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  getByUser(@Req() req){
    const user_id = req.user.id
    return this.itemsService.getByUser(user_id)
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/items',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    })
  }))
  create(
    @Req() req,
    @Body() data: {
      title: string, 
      location: string, 
      category: string, 
      description: string,
      status: string
    }, @UploadedFile() file: Express.Multer.File){
    return this.itemsService.create({
      ...data,
      user_id: req.user.id,
      image: `/uploads/items/${file?.filename}`
    })
  }

  @Get('/:id')
  getOne(@Param('id', ValidateItemExist) id: string){
    return this.itemsService.getOne(Number(id))
  }

  @Delete('/:id')
  remove(@Param('id', ValidateItemExist) id: string){
    return this.itemsService.delete(Number(id))
  }
}
