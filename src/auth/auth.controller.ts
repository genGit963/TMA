import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() newUserDto: UserAuthDto): Promise<string> {
    return this.authServices.signUp(newUserDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) loginUserDto: UserAuthDto): Promise<Object> {
    return this.authServices.signIn(loginUserDto);
  }
}
