import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<String> {
    return this.appService.getHello();
  }

  @Get("/teste")
  async getTeste(): Promise<String> {
    return this.appService.getHello();
    
  }
}
