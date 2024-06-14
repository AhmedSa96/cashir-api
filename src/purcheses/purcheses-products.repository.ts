import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PurchesesProducts } from "./entities/purcheses-products.entity";

@Injectable()
export class PurchesesProductsRepository extends Repository<PurchesesProducts> {

    constructor(dataSource: DataSource) {
        super(PurchesesProducts, dataSource.createEntityManager());
    }
}