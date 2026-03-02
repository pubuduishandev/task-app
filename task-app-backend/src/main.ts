import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ENABLE CORS ---
  // This tells NestJS to accept requests from your React frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 1. Handle Success
  app.useGlobalInterceptors(new TransformInterceptor());

  // 2. Handle Errors (This makes them match!)
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();