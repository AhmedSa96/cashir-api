import { Client } from "src/clients/entities/client.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ClientReceipt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    notes?: string;
    
    @Column()
    paymentDate: Date;

    @Column()
    amount: number;

    //? TODO: implement currency and currency value, dose it need?

    @ManyToOne(() => Client, client => client.receipts, { onDelete: "CASCADE" })
    client: Client[];

    @Column()
    clientId: number;

    @ManyToOne(() => User, user => user.clientsReceipts, { onDelete: "CASCADE" })
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