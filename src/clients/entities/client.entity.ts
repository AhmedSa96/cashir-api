import { ClientReceipt } from "src/receipt/entities/client-receipt.entity";
import { Sales } from "src/sales/entities/sales.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    address?: string;
    
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

    @OneToMany(() => Sales, sales => sales.client, { onDelete: "CASCADE" })
    sales: Sales[];

    @OneToMany(() => ClientReceipt, receipt => receipt.client, { onDelete: "CASCADE" })
    receipts: ClientReceipt[];
}