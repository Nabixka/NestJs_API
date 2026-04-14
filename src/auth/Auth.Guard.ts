import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private knexService: KnexService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req =  context.switchToHttp().getRequest()

        const authHeader = req.headers['authorization']
        if(!authHeader) throw new UnauthorizedException("hai")

        const token = authHeader.split(' ')[1];
        if(!token) throw new UnauthorizedException("test")
        try{
            const decoded: any = jwt.verify(token, `${process.env.SECRET_KEY}`)
            const user = await this.knexService.connection('users')
            .where({ id: decoded.id, token})
            .first()

            if(!user) throw new UnauthorizedException("djka") 
            req.user = user
            return true
        }
        catch(err){
            throw new UnauthorizedException("dkajdj")
        }
    }
}