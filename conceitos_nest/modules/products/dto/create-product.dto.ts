import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;

  @IsDateString()
  @IsNotEmpty()
  createdAt!: Date;

  @IsDateString()
  @IsOptional()
  updatedAt?: Date;
}
