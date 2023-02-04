import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './model/UserPayload';
import { UserToken } from './model/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.isvalidPassword(user, password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException(
      'Email address or password provided is incorrect.',
    );
  }

  private async isvalidPassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
