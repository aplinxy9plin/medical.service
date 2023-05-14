import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './elastic.service';
import { SearchController } from './elastic.controller';
import { SearchQueryBuilderService } from './elastic-builder.service';
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [],
      useFactory: async () => ({
        node: process.env.ELASTIC_URL || 'http://localhost:9200',
        maxRetries: 10,
        requestTimeout: 60000,
        auth: {
          username: process.env.ELASTIC_USERNAME,
          password: process.env.ELASTIC_PASSWORD
        },
      }),
      inject: [],
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService, SearchQueryBuilderService],
  exports: [ElasticsearchModule, SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) { }
  public async onModuleInit() {
    await this.searchService.createIndex();
  }
}
