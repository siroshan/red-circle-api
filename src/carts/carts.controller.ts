import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { CartItemsService } from 'src/cart-items/cart-items.service';
import { CreateCartItemDto } from 'src/cart-items/dto/create-cart-item.dto';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productService: ProductsService,
    private readonly cartItemService: CartItemsService,
  ) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto, @GetUser() user: User) {
    const product: Product = await this.productService.findOne(
      createCartDto.productID,
    );
    return this.cartsService.create(product, createCartDto.qty, user);
  }

  @Public()
  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get('/my-cart')
  findByUser(@GetUser() user: User) {
    return this.cartsService.findByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Patch('/add')
  async addProductToCart(
    @Body() createCartItemDto: CreateCartItemDto,
    @GetUser() user: User,
  ) {
    const cart: Cart = await this.cartsService.findByUser(user);
    const product: Product = await this.productService.findOne(
      createCartItemDto.productID,
    );
    const cartItem: CartItem = await this.cartItemService.create(
      cart,
      product,
      createCartItemDto.qty,
    );
    return await this.cartsService.addProductToCart(cart, cartItem);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartsService.update(id, updateCartDto);
  // }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
