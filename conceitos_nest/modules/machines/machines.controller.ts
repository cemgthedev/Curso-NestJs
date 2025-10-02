import { Controller, Get } from '@nestjs/common';
import { MachinesService } from './machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private readonly appService: MachinesService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
