import { Cart } from 'src/carts/entities/cart.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Cart, (cart) => cart.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  cart: Cart;
}
