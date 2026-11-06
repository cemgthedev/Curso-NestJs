import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly id?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly minPrice?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly maxPrice?: number;

  @IsString()
  @IsOptional()
  readonly title?: string;
}
