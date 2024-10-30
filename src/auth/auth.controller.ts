import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  signUp(@Body() newUserDto: UserAuthDto): Promise<string> {
    return this.authServices.signUp(newUserDto);
  }
}
