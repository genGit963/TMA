import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserAuthDto } from './dto/auth.dto';

@Injectable() // Make it injectable for dependency injection
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`${username} not found !`);
    }
    return user;
  }

  async signUp(newUserDto: UserAuthDto): Promise<string> {
    const { username, password } = newUserDto;

    const checkUserExistAlready = await this.findOneBy({ username });
    if (checkUserExistAlready) {
      throw new BadRequestException(`${username} already exist !`);
    }

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;

    const registerUser = await newUser.save();
    if (registerUser) {
      return `User: ${registerUser.username} registered successfully !`;
    }
  }
}
