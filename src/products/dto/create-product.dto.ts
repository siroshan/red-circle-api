import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  description: string;
  @IsNumber()
  volume: number;
  @IsNumber()
  price: number;
  @IsString()
  image: string;
}
