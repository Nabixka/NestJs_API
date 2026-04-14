import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { KnexService } from 'src/database/knex.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private knexService: KnexService) {}

    // Login
    async login(data: {email: string, password: string}){
        const exist = await this.knexService.connection('users')
        .where("email", data.email)
        .first()

        if(!exist) throw new NotFoundException()
        
        const isMatch = await bcrypt.compare(data.password, exist.password)
        if(!isMatch) throw new BadRequestException("Password Salah")

        delete exist.password

        return {
            message: "success",
            data: exist
        }
    }

    async verifyOtp(data: {email: string, otp: string}){
        const exist = await this.knexService.connection("users")
        .where("email", data.email)
        .first()

        if(!exist) throw new NotFoundException
        if(data.otp == exist.otp_code){
            const payload = {
                id : exist.id
            }

            const token =  jwt.sign(payload, `${process.env.SECRET_KEY}`, {
                expiresIn: '1d'
            })

            await this.knexService.connection("users")
            .where("id", exist.id)
            .update({ token })

            delete exist.password
            delete exist.otp_code

            return {
                message: "success",
                data: { ...exist, token }
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
