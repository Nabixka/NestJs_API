import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { ValidateReportExist } from 'src/pipes/report/validate_report_exist.pipe';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAll(){
    return this.reportService.getAll()
  }

  @Get("/:id")
  getOne(@Param("id", ValidateReportExist) id: string){
    return this.reportService.getOne(Number(id))
  }
}
