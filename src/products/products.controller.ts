import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Public()
  @Get('/search')
  searchProduct(
    @Query('searchQuery') searchQuery: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('type') type: string,
    @Query('gt') gt: number,
    @Query('lt') lt: number,
  ): Promise<{ result: Product[]; count: number }> {
    return this.productsService.searchProduct(
      searchQuery,
      take,
      skip,
      type,
      gt,
      lt,
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch()
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
