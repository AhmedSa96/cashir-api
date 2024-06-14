import { LoginDto } from './models/login-dto';
// import { User } from './../users/entities/user.entity';
// import { map, Observable } from 'rxjs';
// import { UsersService } from './../users/users.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './models/login-response';
import { UsersService } from '../users/users.service';
import { UserResource } from '../users/models/user-resource';
import { plainToClass } from 'class-transformer';
import { CurrentAuthUser } from './models/current-auth-user';
import { CreateComponyDto } from './models/create-compony.dto';
import { ChangePasswordDto } from './models/chnage-password.dto';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  //   validateUser(email: string, pass: string): Observable<any> {
  //     return this.usersService.findOneByEmail(email)
  //         .pipe(
  //             map((user) => {
  //                 if (user && user.password === pass) {
  //                     const { password, ...result } = user;
  //                     return result;
  //                 }
  //                 return null;
  //             })

  //         );
  //   }

  async login(user: any) {
    const { id, email, user_type } = user;
    const payload: CurrentAuthUser = { id, email, sub: id, user_type };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
      }),
    };
  }

  public async loginUser(user: LoginDto): Promise<LoginResponse> {
    try {
      const userEntity = await this.usersService.findOneByEmail(user.email);
      const token = await this.makeUserLogin(userEntity, user);

      return {
        access_token: token.access_token,
        user: plainToClass(UserResource, userEntity),
      } as LoginResponse;
    } catch (e) {
      throw new NotFoundException('invalid credentials');
    }
  }

  public async createNewCompony(compony: CreateComponyDto) {
    try {
      return await this.usersService.create({
        ...compony,
        user_type: UserType.COMPONY,
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'we are not able to register new user now, please try later',
      );
    }
  }

  public async chnagePassword(body: ChangePasswordDto, userId: number) {
    return await this.usersService.changePassword(body, userId);
  }

  private async makeUserLogin(
    user: User,
    login: LoginDto,
  ): Promise<{ access_token: string }> {
    const isPasswordMatch = await bcrypt.compare(login.password, user.password);
    if (!isPasswordMatch) {
      throw new NotFoundException();
    }

    return await this.login(user);
  }
}
