import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { SignInDTO } from "./dto/sign-in.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "src/helper/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async singIn(@Body() login: SignInDTO): Promise<any> {
    return await this.authService.singIn(login.username, login.password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
