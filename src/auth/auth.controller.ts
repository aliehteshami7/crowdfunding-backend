import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginRo } from './dto/login.ro';
import { TokenDto } from './dto/token.dto';
import { UserRo } from 'src/users/dto/user.ro';
import { TokenRo } from './dto/token.ro';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  async login(@Request() { user }: { user: UserRo }): Promise<LoginRo> {
    return await this.authService.login(user);
  }

  @Post('verifyToken')
  @HttpCode(200)
  async verify(@Body() tokenDto: TokenDto): Promise<TokenRo> {
    return await this.authService.validateToken(tokenDto);
  }
}
