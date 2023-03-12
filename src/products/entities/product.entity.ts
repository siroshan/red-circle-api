import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WineType {
  RED = 'red',
  WHITE = 'white',
  SPARKLING = 'saprkling',
  DESSERT = 'dessert',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: WineType })
  type: WineType;

  @Column()
  description: string;

  @Column()
  volume: number;

  @Column()
  price: number;

  @Column()
  image: string;
}
