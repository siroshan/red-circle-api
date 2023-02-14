import { IsString, IsNumber } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  productID: string;
  @IsNumber()
  qty: number;
}
