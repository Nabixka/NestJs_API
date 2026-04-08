import { ConflictException, Injectable, PipeTransform } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";

@Injectable()
export class ValidateEmailExist implements PipeTransform{
    constructor(private knexService: KnexService) {}
    
    async transform(value: any) {
        const email = value.email

        const exist = await this.knexService.connection('users')
        .where({ email })
        .first()

        if(exist){
            throw new ConflictException("Email Sudah Terdaftar")
        }
        return value
    }

}