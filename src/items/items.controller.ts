import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ValidateItemExist } from 'src/pipes/validate_item_exist.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAll(){
    return this.itemsService.getAll()
  }

  @Get('/:id')
  getOne(@Param('id', ValidateItemExist) id: string){
    return this.itemsService.getOne(Number(id))
  }

  @Post()
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
    @Body() data: {
      title: string, 
      location: string, 
      category: string, 
      description: string,
      status: string,
      user_id: number
    }, @UploadedFile() file: Express.Multer.File){
    return this.itemsService.create({
      ...data,
      image: `/uploads/items/${file?.filename}`
    })
  }

  @Delete('/:id')
  remove(@Param('id', ValidateItemExist) id: string){
    return this.itemsService.delete(Number(id))
  }
}
