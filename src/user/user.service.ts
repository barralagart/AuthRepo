import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async create(user: User): Promise<any> {
    await this.userRepository.save(user);
  }

  async remove(username: string): Promise<any> {
    return await this.userRepository.delete(username);
  }
}
