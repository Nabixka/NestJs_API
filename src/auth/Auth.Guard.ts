import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { KnexService } from "src/database/knex.service";
import * as jwt from 'jsonwebtoken'
require("dotenv").config()

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private knexService: KnexService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req =  context.switchToHttp().getRequest()

        const authHeader = req.headers['authorization']
        if(!authHeader) return false

        const token = authHeader
        try{
            const decoded: any = jwt.verify(token, `${process.env.SECRET_KEY}`)
            const user = await this.knexService.connection('users')
            .where({ id: decoded.id, token})
            .first()

            if(!user) return false
            req.user = user
            return true
        }
        catch(err){
            return false
        }
    }
}