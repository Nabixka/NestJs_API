import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, ItemsController],
  providers: [UsersService, ItemsService],
})
export class AppModule {}
