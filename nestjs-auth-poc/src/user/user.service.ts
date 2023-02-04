import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      email: 'john@test.com',
      name: 'john',
      password: '$2a$10$YrdlY5m0gFPSEJFWQS4Hy.9oxnNEskVt2.aZp.Udmg.46P9XAOakK',
    },
    {
      id: 2,
      email: 'maria@teste.com',
      name: 'maria',
      password: '$2a$10$YrdlY5m0gFPSEJFWQS4Hy.9oxnNEskVt2.aZp.Udmg.46P9XAOakK',
    },
  ];

  // todo: add bcryp times to env
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      id: this.users.length + 1,
    };
    this.users.push(user);
    return { ...user, password: undefined };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
