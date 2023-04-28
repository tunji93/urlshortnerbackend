import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;
}
