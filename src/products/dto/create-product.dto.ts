import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { WineType } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  name: string;
  @IsString()
  type: WineType;
  @IsString()
  description: string;
  @IsNumber()
  volume: number;
  @IsNumber()
  price: number;
  @IsString()
  image: string;
}
