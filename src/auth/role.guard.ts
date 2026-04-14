import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private roles: string[]){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const user = req.user   

        if(!user || !this.roles.includes(user.role)){
            throw new ForbiddenException("Anda TIdak Berhak")
        }

        return true
    }
}