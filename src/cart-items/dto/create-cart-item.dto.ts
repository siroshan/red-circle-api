import { IsString, IsNumber } from 'class-validator';
import { CreateCartDto } from 'src/carts/dto/create-cart.dto';

export class CreateCartItemDto {
  @IsString()
  productID: string;
  @IsNumber()
  qty: number;
}
