import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from './gmail.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, MailService],
    exports: [AuthService]
})
export class AuthModule {}
