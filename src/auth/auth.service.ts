import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { hash, compare, genSalt } from "bcrypt";
import { AuthenticatedDTO } from "./dto/authenticated.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // return all users from db (without password field)
  async getUsers(): Promise<User[]> {
    const usersList = await this.userService.findAll();
    let users: User[] = [];

    usersList.forEach((user) => {
      const { password, ...result } = user;
      users.push(result);
    });

    return users;
  }

  // authenticate user and return token
  async singIn(username: string, pass: string): Promise<AuthenticatedDTO> {
    const user = await this.userService.findOne(username);

    if (!(await compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      }),
    };
  }

  // register a new user
  async signUp(user: User): Promise<boolean> {
    if (await this.userService.findOne(user.username)) {
      // user not registered yet
      return false;
    }

    user.password = await hash(user.password, await genSalt(10));
    await this.userService.create(user);
    return true;
  }

  // delete a user by username
  async deleteUser(username: string): Promise<boolean> {
    const result = await this.userService.remove(username);

    if (result.affected == 0) return false;

    return true;
  }
}
