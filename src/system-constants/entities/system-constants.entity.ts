import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SystemConstantsParent } from "./system-constants-parent.entity";

@Entity()
export class SystemConstants {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne((_) => SystemConstantsParent, (parent) => parent.constants, { onDelete: "CASCADE" })
    parent: SystemConstantsParent;

    @Column()
    parentId: number;
}