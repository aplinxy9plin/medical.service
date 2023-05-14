import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ReportsService } from './reports.service';
import { AutocompleteDTO, ReportsCreateDTO } from './reports.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
  ) {}

  @Post('updateSchema')
  async updateSchema(@Body() createDTO: ReportsCreateDTO) {
    return await this.reportsService.updateSchema(createDTO);
  }

  @Get('get')
  async getCurrent() {
    return await this.reportsService.getSchema();
  }

  @Get('fullSchema')
  async getSchema() {
    return await this.reportsService.getFullSchema();
  }

  @Get('autoComplete')
  async autoComplete(@Query() query: AutocompleteDTO) {
    return await this.reportsService.autoComplete(query.value);
  }

}
