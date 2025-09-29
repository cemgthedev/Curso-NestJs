import { Controller, Get } from '@nestjs/common';
import { HelloService } from 'services/hello.service';

@Controller('automatic')
export class AutomaticController {
  constructor(private readonly appService: HelloService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
