import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { IsPublic } from 'src/auth/decorator/is-public-decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
