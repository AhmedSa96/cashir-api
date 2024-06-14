import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ReportCategory {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Report, report => report.category, { onDelete: "CASCADE" })
    reports: Report[];
}

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    reportServerName: string;

    @Column({ default: "handlebars" })
    engine: string;

    @Column({ default: "chrome-pdf" })
    fileType: string;
    
    @Column({ default: "chrome-pdf" })
    fileTypeHeader: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => ReportCategory, category => category.reports, { eager: true, onDelete: "CASCADE"})
    category: ReportCategory
}