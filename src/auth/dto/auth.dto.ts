import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserAuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(6)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must have atleast one Capital, Special Character, Number each !',
    },
  )
  password: string;
}
