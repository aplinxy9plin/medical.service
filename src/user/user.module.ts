import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { ReportsSchema } from 'src/models/reports.schema';
import { SearchService } from 'src/elastic/elastic.service';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchQueryBuilderService } from 'src/elastic/elastic-builder.service';
import { SearchModule } from 'src/elastic/elastic.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Reports', schema: ReportsSchema }]),
    SearchModule,
  ],
  providers: [UserService, SearchService, SearchQueryBuilderService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
