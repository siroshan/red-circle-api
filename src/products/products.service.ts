import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct: Product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async searchProduct(searchQuery: string, take = 10, skip = 0) {
    if (searchQuery) {
      const [result, total] = await this.productRepository.findAndCount({
        where: { name: ILike('%' + searchQuery + '%') },
        order: { id: 'DESC' },
        take,
        skip,
      });
      return {
        products: result,
        count: total,
      };
    }
    const [result, total] = await this.productRepository.findAndCount({
      order: { id: 'DESC' },
      take,
      skip,
    });
    return {
      products: result,
      count: total,
    };
  }

  async update(updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productRepository.save(updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
