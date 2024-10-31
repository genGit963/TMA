import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserAuthDto } from './dto/auth.dto';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload, UserLoginRespone } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UserRepository,
    private jwtServices: JwtService,
  ) {}

  async signUp(newUserDto: UserAuthDto): Promise<string> {
    return await this.userRespository.signUp(newUserDto);
  }

  async signIn(loginUserDto: UserAuthDto): Promise<UserLoginRespone> {
    const username: string =
      await this.userRespository.verifyUserPassword(loginUserDto);
    try {
      if (username) {
        const jwtPayload: UserJwtPayload = { username };
        const accessToken = this.jwtServices.sign(jwtPayload);
        return { Token: accessToken };
      } else {
        throw error;
      }
    } catch (error) {
      throw new UnauthorizedException(`Invalid credentials !`);
    }
  }
}
