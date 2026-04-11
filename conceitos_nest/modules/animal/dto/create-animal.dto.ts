import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly specie: string;

  @IsNumber()
  readonly age: number;
}
