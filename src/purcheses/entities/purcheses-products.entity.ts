import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Purches } from "./purches.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class PurchesesProducts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    totalPrice: number;
    
    @ManyToOne((_) => Purches, (purches) => purches.purchesProducts, { onDelete: "CASCADE" })
    purches: Purches;

    @Column()
    purchesId: number;

    
    @ManyToOne((_) => Product, (product) => product.saleProducts, { onDelete: "CASCADE" })
    product: Product;

    @Column()
    productId: number;
}