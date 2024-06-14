import { Client } from "src/clients/entities/client.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PurchesesProducts } from "./purcheses-products.entity";
import { Supplier } from "src/suppliers/entities/supplier.entity";

@Entity()
export class Purches {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    notes?: string;

    @Column({ nullable: true, default: 0 })
    paymentAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User, compony => compony.sales, { onDelete: "CASCADE" })
    compony: User

    @Column()
    componyId: number;

    @ManyToOne(() => Supplier, supplier => supplier.purcheses, { onDelete: "CASCADE", nullable: true })
    supplier?: Supplier

    @Column({ nullable: true })
    supplierId?: number;

    @OneToMany(() => PurchesesProducts, product => product.purches, { onDelete: "CASCADE"})
    purchesProducts: PurchesesProducts;

}