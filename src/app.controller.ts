import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('env/:key')
  getEnvValue(@Param('key') key: string): string {
    return process.env[key] || 'Key not found';
  }

}
