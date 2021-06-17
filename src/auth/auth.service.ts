import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRo } from '../users/dto/user.ro';
import { LoginRo } from './dto/login.ro';
import TokenDto from './dto/token.dto';
import { TokenRo } from './dto/token.ro';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(userRo: UserRo): Promise<LoginRo> {
    const { username } = userRo;
    return {
      token: await this.jwtService.signAsync({ username }),
      user: userRo,
    };
  }

  async validateToken(tokenDto: TokenDto): Promise<TokenRo> {
    try {
      const user = await this.jwtService.verifyAsync(tokenDto.token);
      return {
        username: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
