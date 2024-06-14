import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './models/create-product-dto';
import { UpdateProductDto } from './models/update-product-dto';
import { GetProductsFilters } from './models/get-products-filters';
import { EventEmitter } from 'node:events';
import { Like } from 'typeorm';

@Injectable()
export class ProductsService {

    public readonly events = new EventEmitter();

    constructor(
        private readonly productsRepository: ProductsRepository
    ) { }

    async findAll(filters: GetProductsFilters) {
        return await this.productsRepository.findByFilters(filters);
    }

    async search(searchKey: string) {
        return await this.productsRepository.find({ where: { name: Like(`${searchKey}%`) }, select: [ 'name', 'id' ] });
    }

    async findOne(id: number) {
        const product = await this.productsRepository.findOne({ where: { id }, relations: ['owner'] });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id}, not found`);
        }

        return product;
    }
    
    async findOneByBarcode(barcode: string) {
        const product = await this.productsRepository.findOne({ where: { barcode } });
        if (!product) {
            throw new NotFoundException(`Product with id: #${barcode}, not found`);
        }

        return product;
    }

    async create(product: CreateProductDto, ownerId: number) {
        const { changeQuantityValue, quantity } = product;
        
        const newProduct = this.productsRepository.create({ ...product, stock: changeQuantityValue * quantity, ownerId });
        return await this.productsRepository.save(newProduct);
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        this.productsRepository.merge(product, updateProductDto, { id });
        return await this.productsRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        const removedProduct = await this.productsRepository.softRemove(product);
        this.events.emit("DELETE", removedProduct);
        return removedProduct;
    }
}
