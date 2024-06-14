import { Client } from "src/clients/entities/client.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SalesProducts } from "./sales-products.entity";

@Entity()
export class Sales {

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

    @ManyToOne(() => Client, client => client.sales, { onDelete: "CASCADE", nullable: true })
    client?: Client

    @Column({ nullable: true })
    clientId?: number;

    @OneToMany(() => SalesProducts, product => product.sale, { onDelete: "CASCADE"})
    saleProducts: SalesProducts;

}