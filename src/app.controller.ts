import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import * as path from 'path';

@Controller()
export class AppController {
  public filePath: string;

  constructor(
    private readonly appService: AppService,
    configService: ConfigService,
  ) 
  {
    this.filePath = path.resolve(__dirname, '../', configService.get('filePath'));
  }

  @Get('filename')
  async run(@Query() query): Promise<[]> {
    const filePath = query && query.filePath ? query.filePath : this.filePath;
    
    return this.appService.init(filePath);
  }
}
