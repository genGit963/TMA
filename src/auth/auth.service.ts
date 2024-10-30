import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { UserAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRespository: UserRepository) {}

  async signUp(newUserDto: UserAuthDto): Promise<string> {
    return await this.userRespository.signUp(newUserDto);
  }
}
