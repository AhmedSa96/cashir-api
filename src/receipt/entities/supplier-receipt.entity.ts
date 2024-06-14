import { Supplier } from "src/suppliers/entities/supplier.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SupplierReceipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    notes?: string;
    
    @Column()
    paymentDate: Date;

    @Column()
    amount: number;

    //? TODO: implement currency and currency value, dose it need?

    @ManyToOne(() => Supplier, supplier => supplier.receipts, { onDelete: "CASCADE" })
    supplier: Supplier;

    @Column()
    supplierId: number;

    @ManyToOne(() => User, user => user.supplierReceipts, { onDelete: "CASCADE" })
    compony: User;

    @Column()
    componyId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}