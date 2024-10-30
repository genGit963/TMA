import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';

@Injectable()
export class AuthService {
  constructor(private readonly userRespository: UserRepository) {}
}
