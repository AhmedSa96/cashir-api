import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Product, (product) => product.productImages, { onDelete: "CASCADE" })
  product: Product

  @Column()
  imageUrl: string;
}
