import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {}
