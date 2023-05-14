import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { ReportsSchema } from 'src/models/reports.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Reports', schema: ReportsSchema }])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
