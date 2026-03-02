import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 1. Import Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ENABLE CORS ---
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- SWAGGER CONFIGURATION ---
  const config = new DocumentBuilder()
    .setTitle('NestTask API')
    .setDescription('The official API documentation for FlickBox Technologies Task Manager')
    .setVersion('1.0')
    .addBearerAuth( // 2. Enable JWT Bearer Token support in Swagger
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name must match the @ApiBearerAuth() decorator in controllers
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 3. Set the endpoint path to /api

  // 1. Handle Success
  app.useGlobalInterceptors(new TransformInterceptor());

  // 2. Handle Errors
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();