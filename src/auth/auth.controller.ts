import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/auth.dto';
import { UserLoginRespone } from './jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() newUserDto: UserAuthDto): Promise<string> {
    return this.authServices.signUp(newUserDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) loginUserDto: UserAuthDto,
  ): Promise<UserLoginRespone> {
    return this.authServices.signIn(loginUserDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: UserEntity) {
    console.log(user);
  }
}
