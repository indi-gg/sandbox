import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController
{
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): string
  {
    return this.appService.getServiceHealthCheck();
  }

  @Get('env/:key')
  getEnvValue(@Param('key') key: string): string
  {
    return process.env[key] || 'Key not found';
  }

}
