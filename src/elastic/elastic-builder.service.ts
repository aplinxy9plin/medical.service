import { Injectable } from '@nestjs/common';
import { SearchDto } from './elastic.dto';

@Injectable()
export class SearchQueryBuilderService {
  constructor() { }

  public buildSearchQuery(searchParam: SearchDto) {
    // tslint:disable-next-line:naming-convention
    try {

      const query = [];
      let flag = false;
      if (searchParam) {
        flag = true;
        query.push({
          multi_match: {
            query: `${JSON.stringify(searchParam)}`,
            type: 'cross_fields',
            fields: [
              'email',
              'firstName',
              'lastName',
              'middleName',
              'sex',
              'report.title',
              'report.value',
              'report.id',
              'report.type'
            ],
            operator: 'or',
          },
        });
        console.log(query);
      }
      if (flag) {
        return {
          query: {
            bool: {
              must: query,
            },
          },
        };
      }
      return {};

    } catch (err) {
      
    }
  }
}