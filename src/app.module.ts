import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretService } from './secret-service/secret-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SecretService],
})

export class AppModule {
  constructor(private readonly secretService: SecretService) {
    this.initializeSecrets();
  }

  async initializeSecrets() {
    await this.secretService.fetchSecret();
  }
}
