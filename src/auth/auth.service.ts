import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { UserAuthDto } from './dto/auth.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(private readonly userRespository: UserRepository) {}

  async signUp(newUserDto: UserAuthDto): Promise<string> {
    return await this.userRespository.signUp(newUserDto);
  }

  async signIn(
    loginUserDto: UserAuthDto,
  ): Promise<{ username: string; token: string }> {
    const user = await this.userRespository.verifyUserPassword(loginUserDto);
    try {
      if (user) {
        return { username: user, token: 'Jwt_token' };
      } else {
        throw error;
      }
    } catch (error) {
      throw new UnauthorizedException(`Invalid credentials !`);
    }
  }
}
