import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserAuthDto } from './auth.dto';

@Injectable() // Make it injectable for dependency injection
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async signUp(newUserDto: UserAuthDto): Promise<UserEntity> {
    const { username, password } = newUserDto;

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;

    const registerUser = await newUser.save();
    if (registerUser) {
      return registerUser;
    }
  }
}
