import { User } from './entities/user.entity';
import { UpdateUserDto } from './models/update-user-dto';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/entities/product.entity';
import { ChangePasswordDto } from 'src/auth/models/chnage-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(filters: FetchUsersFiltersDto) {
    return await this.usersRepository.findAll(filters);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOne(id: number): Promise<UserResource> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(UserResource, user);
  }

  async create(user: CreateUserDto): Promise<UserResource> {
    const hash = await bcrypt.hash(user.password, 10);

    const newUser = this.usersRepository.create({
      ...user,
      password: hash,
    });

    const savedUser = await this.usersRepository.save(newUser);

    return plainToClass(UserResource, savedUser);
  }

  async update(user: UpdateUserDto): Promise<UserResource> {
    const oldUser = await this.usersRepository.findOne({ where: { id: user.id } });
    const newUser = this.usersRepository.merge(oldUser, user)
    const savedUser = await this.usersRepository.save(newUser);

    return plainToClass(UserResource, savedUser);
  }

  async delete(id: number): Promise<UserResource> {
    const user = await this.findOne(id);

    await this.usersRepository.delete(id);

    return user;
  }

  async findOrdersByUserId(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['sales', 'purcheses'],
    });

    const { sales, purcheses } = user;
    return { sales, purcheses };
  }

  async addProductToFavorites(userId: number, productId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorate'],
    });

    const product = await this.usersRepository.createQueryBuilder()
      .select('product')
      .from('product', 'product')
      .where('product.id = :id', { id: productId })
      .getOne() as Product;

    // console.log({user, product});
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    user.favorate.push(product);

    await this.usersRepository.save(user);

    return user;
  }

  async changePassword(body: ChangePasswordDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    
    if (!await bcrypt.compare(body.oldPassword, user.password))
      throw new BadRequestException("your old password is not correct!!!");

    const hash = await bcrypt.hash(body.newPassword, 10);
    user.password = hash;

    return await this.usersRepository.save(user);
  }
}
