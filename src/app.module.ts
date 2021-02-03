import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './models/product.model';
import { Users } from './models/users.model';
import { ProductController } from './controllers/product/product.controller';
import { UsersController } from './controllers/users/users.controller';
import { Videos } from './models/video.model';
import { VideosController } from './controllers/videos/videos.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Product, Users, Videos],
    }),
    TypeOrmModule.forFeature([Product, Users, Videos]),
  ],
  controllers: [AppController, ProductController, UsersController, VideosController],
  providers: [AppService],
})
export class AppModule {}
