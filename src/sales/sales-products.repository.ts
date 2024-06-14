import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SalesProducts } from "./entities/sales-products.entity";

@Injectable()
export class SalesProductsRepository extends Repository<SalesProducts> {

    constructor(private readonly dataSource: DataSource) {
        super(SalesProducts, dataSource.createEntityManager());
    }

    async createSale() {
        const runner = this.dataSource.createQueryRunner();
        
    }
}