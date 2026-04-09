import { Injectable } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";

@Injectable()
export class ReportService{
  constructor(private knexService: KnexService) {}

  async getAll(){
    const get = await this.knexService.connection('report').select("*")

    return {
      message: "success",
      data: get
    }
  }
}