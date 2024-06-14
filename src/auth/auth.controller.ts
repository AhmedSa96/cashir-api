import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './models/login-dto';
import { LoginResponse } from './models/login-response';
import { UserResource } from 'src/users/models/user-resource';
import { CreateComponyDto } from './models/create-compony.dto';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/shared/decorators/user.decorator';
import { ChangePasswordDto } from './models/chnage-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiNotFoundResponse({
    description: 'Not found',
    schema: { example: { statusCode: 404, message: 'invalid credentials' } },
  })
  async login(@Body() user: LoginDto): Promise<LoginResponse> {
    return await this.authService.loginUser(user);
  }

  @Post("register")
  @ApiOkResponse({ type: UserResource })
  public async register(
    @Body() body: CreateComponyDto
  ) {
    return await this.authService.createNewCompony(body);
  }

  @Post("change-password")
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async changePassword(
    @Body() body: ChangePasswordDto,
    @User() user: UserEntity,
  ) {
    return await this.authService.chnagePassword(body, user.id);
  }
}
