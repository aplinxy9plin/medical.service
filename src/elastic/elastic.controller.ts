import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './elastic.service';
import { SearchDto } from './elastic.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService,
  ) {}

  @Post('search')
  async fetchESResults(
    @Body() searchDto: SearchDto,
  ) {
    return this.searchService.search(searchDto);
  }

}
