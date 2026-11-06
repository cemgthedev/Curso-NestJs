import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'entities/product.entity';
import { CreateProductDto } from 'modules/products/dto/create-product.dto';
import { QueryProductDto } from 'modules/products/dto/query-product.dto';
import { UpdateProductDto } from 'modules/products/dto/update-product.dto';
import { QueryFailedError, Repository } from 'typeorm';

// Códigos de erro do PostgreSQL
const PG_ERRORS = {
  NOT_NULL_VIOLATION: '23502',
  FOREIGN_KEY_VIOLATION: '23503',
  UNIQUE_VIOLATION: '23505',
  CHECK_VIOLATION: '23514',
  NUMERIC_OUT_OF_RANGE: '22003',
  STRING_TOO_LONG: '22001',
} as const;

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async query(
    options: QueryProductDto,
  ): Promise<{ data: Product[]; total: number; limit: number; page: number }> {
    const { id, title, minPrice, maxPrice, limit, page } = options;

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      throw new BadRequestException('minPrice cannot be greater than maxPrice');
    }

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (id !== undefined) {
      queryBuilder.andWhere('product.id = :id', { id });
    }
    if (minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }
    if (title) {
      queryBuilder.andWhere('product.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    const [products, total] = await queryBuilder
      .take(limit ?? 10)
      .skip((page - 1) * (limit ?? 10))
      .getManyAndCount();

    return {
      data: products,
      total,
      limit: limit ?? 10,
      page: page ?? 1,
    };
  }

  async update(id: number, product: UpdateProductDto): Promise<Product> {
    const existing = await this.findOne(id); // já lança 404
    Object.assign(existing, product);

    try {
      return await this.productRepository.save(existing);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.productRepository.delete(id);

      if (!result.affected) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError(error: unknown): never {
    // Não converte erros HTTP já tratados (404, 400...) em 500
    if (error instanceof HttpException) throw error;

    if (error instanceof QueryFailedError) {
      const { code } = error.driverError as { code?: string };

      switch (code) {
        case PG_ERRORS.UNIQUE_VIOLATION:
          throw new ConflictException('Product already exists');

        case PG_ERRORS.FOREIGN_KEY_VIOLATION:
          throw new ConflictException(
            'Operation violates a relation with another resource',
          );

        case PG_ERRORS.NOT_NULL_VIOLATION:
          throw new BadRequestException('A required field is missing');

        case PG_ERRORS.CHECK_VIOLATION:
          throw new BadRequestException('A value violates a data constraint');

        case PG_ERRORS.STRING_TOO_LONG:
          throw new BadRequestException('A text value is too long');

        case PG_ERRORS.NUMERIC_OUT_OF_RANGE:
          throw new BadRequestException('A numeric value is out of range');
      }
    }

    // Erro inesperado: loga o detalhe, mas não vaza para o cliente
    this.logger.error(
      error instanceof Error ? error.message : 'Unknown error',
      error instanceof Error ? error.stack : undefined,
    );
    throw new InternalServerErrorException('Unexpected error');
  }
}
