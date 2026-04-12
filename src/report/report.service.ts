import { Injectable } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";
import { reportMap } from "./helper/reportMap";

@Injectable()
export class ReportService{
  constructor(private knexService: KnexService) {}
  
  // Get All Report
  async getAll(){
    const report = await this.knexService.connection('report').select("*")

    return {
      message: "success",
      data: report
    }
  }

  // Get Report By Id
  async getOne(id: number){
    const report = await this.knexService.connection('report')
    .where({ id })
    .first()

    return{
      message: "success",
      data: report
    }
  }

  async create(data: {user_id: number, item_id: number, proof: string, reason: string}){
    const [create] = await this.knexService.connection('report')
    .insert(data)
    .returning("*")

    const getData = await this.knexService.connection('report')
    .join()

    return{
      message: "success",
      data: reportMap(getData)
    }
  }

}