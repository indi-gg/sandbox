import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class SecretService
{
  constructor(private configService: ConfigService) {}

  async fetchSecret(): Promise<void> {
    const secretName = this.configService.get<string>('APP_NAME');

    //log secretName
    console.log('secretName: ', secretName);

    const client = new AWS.SecretsManager({
      region: 'ap-south-1',
    });

    try 
    {
      const data = await client.getSecretValue({ SecretId: secretName }).promise();
      if ('SecretString' in data) 
      {
        const secret = JSON.parse(data.SecretString);
        for (const key in secret)
        {
          if (secret.hasOwnProperty(key))
          {
            process.env[key] = secret[key];
          }
        }
      } 
      else
      {
        const buff = Buffer.from(data.SecretBinary.toString(), 'base64');
        const decodedBinarySecret = buff.toString('ascii');
        const secret = JSON.parse(decodedBinarySecret);
        for (const key in secret)
        {
          if (secret.hasOwnProperty(key))
          {
            process.env[key] = secret[key];
          }
        }
      }
    }
    catch(err)
    {
      console.error('Error fetching secret from AWS Secrets Manager', err);
      throw err;
    }
  }
}
