import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DataFormat } from '../data.format';

export class HttpParser extends DataFormat {
  private readonly regParseLink: RegExp;
  private readonly encodingType: string;

  constructor(configService) {
    super();
    this.regParseLink = new RegExp( configService.get('regParseLink') )
    this.encodingType = configService.get('encodingType')
  }

  parseLink = (file: string[]): string[] => {
    const links = []
    file.forEach(el => {
      const matches = this.searchTextByParam(this.regParseLink, el);
      if (matches && matches[1]) {
        links.push(matches[1])
      }
    })

    return links
  }

  countLink = (links: string[]): any => {
    return this.countEqualWords(links)
  }

  formatLinks = (links: any): string[] => {
    const formatOut: any[] = []

    for (const key in links) {

      formatOut.push({
        Host: key,
        Count: links[key],
      });
    }

    return this.sortArrayByKey(formatOut, 'Count')
  }

  readFile = async (filePath: string): Promise<string> => {
    try {
      const file = await fs.promises.readFile(filePath, {encoding: this.encodingType});
      return file.toString();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

