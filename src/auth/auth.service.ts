import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { KnexService } from 'src/database/knex.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private knexService: KnexService) {}

    // Login
    async login(data: {email: string, password: string}){
        const user = await this.knexService.connection('users')
        .where('email', data.email )
        .first()

        if(!user){
            throw new NotFoundException("Email Tidak Terdaftar")
        }

        const isMatch = await bcrypt.compare(data.password, user.password)
        if(!isMatch) throw new BadRequestException("Password Tidak Sesuai")

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
            data: {
                token
            }
        }
    }

    // Register
    async register(data: {username: string, password: string, email: string, role: string}){
        data.role = data.role || "Member"
        const hash = await bcrypt.hash(data.password, 10)
        data.password = hash
        
        const [user] = await this.knexService.connection('users')
        .insert(data)
        .returning("*")

        delete user.password
        return {
            message: "sucess",
            data: user
        }
    }

    // Forgot Password
    async forgot(data: {email: string, password: string}){
        
    }
}
