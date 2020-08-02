import { Injectable } from '@nestjs/common';
import { HttpParser } from './parser/http.parser';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService extends HttpParser {
  constructor(configService: ConfigService) {
    super(configService);
  }

  async init (filePath: string) {
    return this.parse(filePath)
  }

  async parse(filePath): Promise<any> {
    const file = await this.readFile(filePath);
    const splitFormat = file.split('\n')
    const links = this.parseLink(splitFormat)
    const linkCount = this.countLink(links)
    console.error('parse', this.formatLinks(linkCount))

    return  this.formatLinks(linkCount)
  }
}
