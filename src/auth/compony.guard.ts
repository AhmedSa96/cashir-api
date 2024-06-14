import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { UserType } from '../users/entities/user.entity';
  
  @Injectable()
  export class ComponyGuard extends AuthGuard('jwt') {
  
    handleRequest(err, user, info) {
      if (err || !user) {
        throw err || new UnauthorizedException();
      }

      // console.log(user);
  
      if (user.user_type !== UserType.COMPONY) {
        throw new UnauthorizedException("Data for compony only");
      }
  
      return user;
    }
  }
  