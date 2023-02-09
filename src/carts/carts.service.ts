import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(product: Product, qty: number, user: User): Promise<Cart> {
    const newCart: Cart = this.cartRepository.create({
      cartItems: [{ product, qty }],
      user: user,
    });
    return await this.cartRepository.save(newCart);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }

  async findByUser(user: User): Promise<Cart> {
    return await this.cartRepository.findOneBy({ user });
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartRepository.findOneBy({ id });
  }

  async addProductToCart(cart: Cart, cartItem: CartItem): Promise<Cart> {
    cart.cartItems = [...cart.cartItems, cartItem];
    return await this.cartRepository.save(cart);
  }

  async remove(id: string) {
    return await this.cartRepository.delete(id);
  }
}
