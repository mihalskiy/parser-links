import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.register({ folder: './config' })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return correct parsers links', async() => {
      const expected = [
        { Host: 'www.google-analytics.com', Count: 24 },
        { Host: 'clients1.google.com', Count: 18 },
        { Host: 'www.google.com', Count: 16 },
        { Host: '69.59.144.138', Count: 15 },
        { Host: 't0.gstatic.com', Count: 15 },
        { Host: 't3.gstatic.com', Count: 15 },
        { Host: 'googleads.g.doubleclick.net', Count: 13 },
        { Host: 'wl.dlservice.microsoft.com', Count: 12 },
      ]
      const result = await appController.run();
      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });
});
