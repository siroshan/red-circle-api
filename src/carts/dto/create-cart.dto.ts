import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsString()
  productID: string;
  @IsNumber()
  qty: number;
}
