import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async create(cart: Cart, product: Product, qty: number): Promise<CartItem> {
    const newCartItem: CartItem = this.cartItemRepository.create({
      cart,
      product,
      qty,
    });
    return await this.cartItemRepository.save(newCartItem);
  }

  async findAll() {
    return await this.cartItemRepository.find();
  }

  async findOne(id: string) {
    return await this.cartItemRepository.findOneBy({ id });
  }

  async updateQty(id: string, qty: number) {
    return await this.cartItemRepository.update(id, { qty });
  }

  // async update(updateCartItemDto: UpdateCartItemDto) {
  //   return await this.cartItemRepository.save(updateCartItemDto);
  // }

  async remove(id: string) {
    return await this.cartItemRepository.delete(id);
  }
}
