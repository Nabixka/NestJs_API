import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { KnexService } from 'src/database/knex.service';
require("dotenv").config()

@Injectable()
export class AuthService {
    constructor(private knexService: KnexService) {}
    async login(data: {email: string, password: string}){
        const user = await this.knexService.connection('users')
        .where('email', data.email )
        .first()

        const payload = {
            id: user.id
        }
        const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, {
            expiresIn: '1d'
        })

        await this.knexService.connection('users')
        .where("id", user.id)
        .update({ token })

        return {
            message: "Berhasil Login",
            token
        }
    }

    async register(data: {username: string, password: string, email: string, role: string}){
        if(data.role == null){
            data.role = "user"
        }
        const [user] = await this.knexService.connection('users')
        .insert(data)
        .returning("*")

        return {
            message: "sucess",
            data: user
        }
    }
}
