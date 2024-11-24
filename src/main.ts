import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AWS from 'aws-sdk';
import { PagamentoModule } from './frameworks-drivers/api/pagamento.module';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(PagamentoModule);
  
  const config = new DocumentBuilder()
  .setTitle('Dog Restaurant API')
  .setDescription('API que gerencia os pedidos da lanchonete')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  await app.listen(3000);

}
bootstrap();