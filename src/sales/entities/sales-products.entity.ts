import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Sales } from "./sales.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class SalesProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    price: number;
    
    @Column()
    totalPrice: number;

    @ManyToOne((_) => Sales, (sale) => sale.saleProducts, { onDelete: "CASCADE" })
    sale: Sales;

    @Column()
    saleId: number;

    @ManyToOne((_) => Product, (product) => product.saleProducts, { onDelete: "CASCADE" })
    product: Product;

    @Column()
    productId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}