import { UserType } from '../../users/entities/user.entity';

export interface CurrentAuthUser {
  id: number;
  sub: number;
  email: string;
  user_type: UserType;
}
