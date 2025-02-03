import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "src/helper/public.decorator";
import { Response } from "express";
import { User } from "src/user/user.entity";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard)
  @Public()
  @Get("user")
  async getUsers() {
    return await this.authService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post("sign-in")
  async singIn(@Body() login: User): Promise<any> {
    return await this.authService.singIn(login.username, login.password);
  }

  @Public()
  @Post("sign-up")
  async singUp(@Body() user: User, @Res() res: Response): Promise<any> {
    if (await this.authService.signUp(user)) {
      return res
        .status(HttpStatus.CREATED)
        .send({ message: "Success registering user" });
    }
    return res
      .status(HttpStatus.OK)
      .send({ message: "User already registered" });
  }

  @UseGuards(AuthGuard)
  @Delete("user")
  async deleteUser(
    @Body() username: string,
    @Res() res: Response,
  ): Promise<any> {
    if (await this.authService.deleteUser(username))
      return res.status(HttpStatus.OK).send("User deleted");

    return res.status(HttpStatus.OK).send("Can't find user, so nothing occurs");
  }
}
