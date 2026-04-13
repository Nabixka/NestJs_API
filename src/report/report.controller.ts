import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ReportService } from './report.service';
import { ValidateReportExist } from 'src/pipes/report/validate_report_exist.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ValidateUserExist } from 'src/pipes/validate_user_exist.pipe';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAll(){
    return this.reportService.getAll()
  }

  @Post()
  @UseInterceptors(FileInterceptor("proof", {
    storage: diskStorage({
      destination: "./uploads/report",
      filename: (req, file, callback) => {
        const uniquename = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${uniquename}${ext}`)
      }
    })
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() data: {user_id: string, item_id: string, proof: string, reason: string }){
    data.proof = `/uploads/report/${file.filename}`
    return this.reportService.create(data)
  }

  @Get("/:id")
  getOne(@Param("id", ValidateReportExist) id: string){
    return this.reportService.getOne(Number(id))
  }

  @Get('/user/:id')
  getReportByUser(@Param('id', ValidateUserExist) id: string){
    return this.reportService.getByUser(Number(id))
  }
}
