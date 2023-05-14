import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchQueryBuilderService } from './elastic-builder.service';
import debug from "debug";
import { uuid } from 'uuidv4';
import { MappingUser } from 'src/types/user';
import { SearchDto } from './elastic.dto';

const error = debug("lib:error:azure");

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly builderService: SearchQueryBuilderService) { }
  public async createIndex() {
    // create index if doesn't exist
    try {
      const index = 'users';
      const checkIndex = await this.esService.indices.exists({ index });
      // if(checkIndex){
      //   await this.esService.indices.delete({
      //     index,
      //   })
      // }
      if (!checkIndex) {
        await this.esService.indices.create({
          index,
          body: {
            mappings: {
              "properties": {
                "email": {
                  "type": "text"
                },
                "birthdate": {
                  "type": "text",
                },
                "firstName": {
                  "type": "text"
                },
                "lastName": {
                  "type": "text"
                },
                "middleName": {
                  "type": "text"
                },
                "sex": {
                  "type": "keyword"
                },
                "report": {
                  "type": "nested",
                  "properties": {
                    "title": {
                      "type": "text"
                    },
                    "value": {
                      "type": "text"
                    },
                    "id": {
                      "type": "keyword"
                    },
                    "type": {
                      "type": "keyword"
                    }
                  }
                },
                "reportVersion": {
                  "type": "integer"
                }
              }
            }
          },
        })
      }
    } catch (err) {
      error(err, 'SearchService -> createIndex');
      throw err;
    }
  }
  public async indexData(payload: any) {
    try {
      return await this.esService.index({
        index: process.env.ELASTIC_INDEX,
        id: uuid(),
        body: payload,
      });
    } catch (err) {
      error(err, 'SearchService -> indexData');
      throw err;
    }
  }
  public async search(searchParam: SearchDto) {
    try {
      const body = await this.esService.search<any>({
        index: process.env.ELASTIC_INDEX,
        body: this.builderService.buildSearchQuery(searchParam),
        from: 0,
        size: 1000,
      });
      const totalCount = body.hits.total;
      const hits = body.hits.hits;
      const data = hits.map((item: any) => item._source);
      return {
        totalCount,
        data,
      };
    } catch (err) {
      error(err, 'SearchService || search query issue || -> search');
      throw err;
    }
  }
}