import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserType } from '../users/entities/user.entity';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user.user_type !== UserType.ADMIN) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
