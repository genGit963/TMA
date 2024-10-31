import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);

    try {
      const registerUser = await newUser.save();
      if (registerUser) {
        return `${registerUser.username.toUpperCase()} registered successfully !`;
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists !');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async verifyUserPassword(loginUserDto: UserAuthDto): Promise<string> {
    const { username, password } = loginUserDto;
    const user = await this.findOneBy({ username });

    if (user && (await user.verifyPassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(
    plainPassword: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(plainPassword, salt);
  }
}
