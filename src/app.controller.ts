import { Controller, Get } from "@nestjs/common";
import { Public } from "./helper/public.decorator";

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  healthcheck(): string {
    return new Date().toLocaleString("pt-BR");
  }
}
