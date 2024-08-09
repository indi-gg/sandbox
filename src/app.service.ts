import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService
{
  getServiceHealthCheck(): string
  {
    return 'API is up and running : Version 1.0.9';
  }
}
