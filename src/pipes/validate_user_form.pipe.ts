import { PipeTransform, Injectable, BadRequestException} from "@nestjs/common";

@Injectable()
export class ValidateUserFormPipe implements PipeTransform{
    transform(value: any) {
        if(!value.username){
            throw new BadRequestException('Nama Wajib Diisi')
        }
        if(!value.email || !value.email.includes('@')){
            throw new BadRequestException('Email Wajib Diisi')
        }
        if(!value.password){
            throw new BadRequestException('Password Wajib Diisi')
        }

        return value
    }
}