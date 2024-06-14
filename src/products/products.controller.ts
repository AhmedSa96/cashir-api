import {
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Param,
  Delete,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from './models/create-product-dto';
import { UpdateProductDto } from './models/update-product-dto';
import { GetProductsFilters } from './models/get-products-filters';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { ComponyGuard } from 'src/auth/compony.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

import fs from 'fs';
import os from 'os';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, ComponyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async findAll(@Query() filters: GetProductsFilters) {
    return await this.productsService.findAll(filters);
  }

  @Get('/search')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async search(@Query('searchKey') searchKey: string) {
    return await this.productsService.search(searchKey);
  }

  @Get('/barcode/:barcode')
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async findOneByBarcode(@Param('barcode') barcode: string) {
    return this.productsService.findOneByBarcode(barcode);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async create(
    @Body() createProductDto: CreateProductDto,
    @User() user: UserEntity,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image);
    return await this.productsService.create(
      createProductDto,
      user.id,
    );
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const now = new Date();
          const dir = `uploads/${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`;

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
              recursive: true,
            });
          }

          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    const domain = os.hostname();
    const imageUrl = domain + '/' + image.path;
    
    return { imageUrl }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.remove(id);
  }
}
