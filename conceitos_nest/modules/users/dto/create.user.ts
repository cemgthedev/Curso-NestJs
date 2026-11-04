import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsEmail()
  readonly email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  readonly password!: string;
}
