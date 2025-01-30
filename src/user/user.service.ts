import { Injectable } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
  private readonly database: Array<UserDTO> = [
    {
      id: 1,
      username: "natan",
      password: "root",
      email: "natan@email.com",
      role: "admin",
    },
    {
      id: 2,
      username: "pikachu",
      password: "1234",
      email: "pikachu@email.com",
      role: "user",
    },
    {
      id: 3,
      username: "cacau",
      password: "1234",
      email: "cacau@email.com",
      role: "user",
    },
    {
      id: 4,
      username: "valentino",
      password: "1234",
      email: "valentino@email.com",
      role: "admin",
    },
  ];

  async getUser(username: string): Promise<UserDTO | undefined> {
    return this.database.find((user) => user.username === username);
  }
}
