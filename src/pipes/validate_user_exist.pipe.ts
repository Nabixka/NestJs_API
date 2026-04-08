import { BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";

@Injectable()
export class ValidateUserExist implements PipeTransform{
    constructor(private knexService: KnexService) {}
    async transform(value: string) {
      const id = Number(value)

      if(isNaN(id)){
        throw new BadRequestException('ID Harus Angka')
      }
      const user =  await this.knexService.connection('users')
      .where({ id })
      .first()

      
      if(!user){
        throw new NotFoundException("User Tidak Ada")
      }

      return id
    }
}