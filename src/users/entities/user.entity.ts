import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Sales } from 'src/sales/entities/sales.entity';
import { Purches } from 'src/purcheses/entities/purches.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { ClientReceipt } from 'src/receipt/entities/client-receipt.entity';
import { SupplierReceipt } from 'src/receipt/entities/supplier-receipt.entity';

export enum UserType {
  ADMIN = 'admin',
  COMPONY = 'compony',
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column()
  phone?: string;

  @Exclude()
  @ApiProperty()
  @Column()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserType, default: UserType.COMPONY })
  user_type: UserType;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  @ApiProperty()
  @OneToMany(type => Product, product => product.owner)
  products: Product[];

  @ApiProperty()
  @ManyToMany(type => Product, { cascade: true })
  @JoinTable()
  favorate: Product[];

  @ApiProperty()
  @OneToMany(_ => Client, client => client.user, { onDelete: "CASCADE" })
  clients: Client[];
  
  @ApiProperty()
  @OneToMany(_ => Supplier, supplier => supplier.user, { onDelete: "CASCADE" })
  suppliers: Supplier[];

  @OneToMany(() => Sales, sale => sale.compony)
  sales: Sales[];
  
  @OneToMany(() => Purches, purches => purches.compony)
  purcheses: Purches[];

  @OneToMany(() => ClientReceipt, receipt => receipt.client, { onDelete: "CASCADE" })
  clientsReceipts: ClientReceipt[];
  
  @OneToMany(() => SupplierReceipt, receipt => receipt.supplier, { onDelete: "CASCADE" })
  supplierReceipts: SupplierReceipt[];
}
