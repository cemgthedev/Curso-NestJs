import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AddHeaderInterceptor } from 'common/interceptors/add-header.interceptor';
import { ChangeDataInterceptor } from 'common/interceptors/change-data.interceptor';
import { SimpleCacheInterceptor } from 'common/interceptors/simple-cache.interceptor';
import { TimingConnectionInterceptor } from 'common/interceptors/timing-connection.interceptor';
import { ParseIntIdPipe } from 'common/pipes/parse-int-id.pipe';
import { CreateProductDto } from 'modules/products/dto/create-product.dto';
import { QueryProductDto } from 'modules/products/dto/query-product.dto';
import { UpdateProductDto } from 'modules/products/dto/update-product.dto';
import { ProductsService } from 'modules/products/products.service';

@Controller('products')
@UsePipes(ParseIntIdPipe)
@UseInterceptors(
  AddHeaderInterceptor,
  TimingConnectionInterceptor,
  SimpleCacheInterceptor,
  ChangeDataInterceptor,
)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() options: QueryProductDto) {
    return this.productsService.query(options);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product: UpdateProductDto) {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
