import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
