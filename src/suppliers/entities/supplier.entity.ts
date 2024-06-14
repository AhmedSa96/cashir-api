import { Purches } from "src/purcheses/entities/purches.entity";
import { SupplierReceipt } from "src/receipt/entities/supplier-receipt.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Supplier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ default: 0 })
    prevAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(_ => User, user => user.clients, { onDelete: "CASCADE" })
    user: User;

    @Column()
    userId: number;

    @OneToMany(_ => Purches, purches => purches.supplier, { onDelete: "CASCADE" })
    purcheses: Purches[];

    @OneToMany(() => SupplierReceipt, receipt => receipt.supplier, { onDelete: "CASCADE" })
    receipts: SupplierReceipt[];
}