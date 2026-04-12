import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";

@Injectable()
export class ValidateReportExist implements PipeTransform{
    constructor(private knexService: KnexService) {}

    async transform(value: any) {
        const id = Number(value)
        console.log(id)
        const exist = await this.knexService.connection("report")
        .where({ id })
        .first()

        if(!exist){
            throw new NotFoundException("Report Tidak Ada")
        }

        return id
    }
}