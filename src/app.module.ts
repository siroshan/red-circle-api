import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductsModule,
    UsersModule,
    CartsModule,
    CartItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
