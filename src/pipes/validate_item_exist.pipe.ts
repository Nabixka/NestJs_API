import { BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";

@Injectable()
export class ValidateItemExist implements PipeTransform{
    constructor(private knexService: KnexService) {}
    async transform(value: any) {
        const id = Number(value)

        if(isNaN(id)){
            throw new BadRequestException('Id Harus Number')
        }

        const exist = await this.knexService.connection('items')
        .where({ id }).first()

        if(!exist){
            throw new NotFoundException('Items Tidak Ada')
        }

        return id
    }
}