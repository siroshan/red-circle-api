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

  async searchProduct(
    searchQuery: string,
    take = 10,
    skip = 0,
    type: string,
    gt: number,
    lt: number,
  ) {
    const query = this.productRepository.createQueryBuilder('product');
    if (searchQuery) {
      query.where('product.name ILIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      });
    }
    if (type && type != 'all') {
      query.where('product.type = :type', { type });
    }
    if (gt) {
      query.where('product.price >= :gt', { gt });
    }
    if (lt) {
      query.where('product.price <= :lt', { lt });
    }
    const [result, total] = await query.take(take).skip(skip).getManyAndCount();

    return {
      result: result,
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
