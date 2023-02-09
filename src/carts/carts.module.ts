import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItemsService } from 'src/cart-items/cart-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), CartItemsService],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
