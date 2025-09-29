import { Controller, Get } from '@nestjs/common';
import { HelloService } from 'services/hello.service';

@Controller()
export class AppController {
  constructor(private readonly appService: HelloService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
