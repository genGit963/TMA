import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserJwtPayload } from './jwt-payload.interface';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: UserJwtPayload): Promise<UserEntity> {
    const username = payload.username;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserJwtPayload } from './jwt-payload.interface';
// import { UserEntity } from './user.entity';
// import { UserRepository } from './user.repository';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private userRepository: UserRepository) {
//     super();
//   }

//   async validate(payload: UserJwtPayload): Promise<UserEntity> {
//     const { username } = payload;
//     const user = await this.userRepository.findOneBy({ username });
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
