import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { SalesProducts } from 'src/sales/entities/sales-products.entity';
import { PurchesesProducts } from 'src/purcheses/entities/purcheses-products.entity';

export enum SalePurchesType {
  BOX = "box",
  KILOGRAM = "kilogram"
}

@Entity()
export class Product {
  /* 
    required int id,
    required String name,
    required String description,
    required double price,
    required String image,
    required int quantity,
    String? category,
    String? barcode,
    required DateTime createdAt,
    required DateTime updatedAt,
  */

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ enum: SalePurchesType, default: SalePurchesType.BOX })
  salePurchesType: SalePurchesType;

  @Column()
  changeQuantityValue: number;

  @Column({ nullable: true })
  barcode?: string;

  @OneToMany((type) => ProductImage, (image) => image.product, { onDelete: "CASCADE" })
  productImages: ProductImage[];

  @ManyToOne((type) => User, (user) => user.products, { onDelete: 'CASCADE' })
  owner: User;

  @Column()
  ownerId: number;

  @OneToMany((type) => SalesProducts, (order) => order.product)
  saleProducts: SalesProducts[];
  
  @OneToMany((type) => PurchesesProducts, (order) => order.product)
  purchesProducts: SalesProducts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
