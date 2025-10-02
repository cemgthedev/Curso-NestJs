import { Injectable } from '@nestjs/common';

@Injectable()
export class MachinesService {
  getHello(): string {
    return 'I am a machine';
  }
}
