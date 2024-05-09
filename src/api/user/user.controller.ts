import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  @UseGuards(AuthGuard)
  @Get()
  async getUserByToken(@Headers('authorization') access_token: string) {
    return await this.userService.getUserByToken(access_token);
  }
  @UseGuards(AuthGuard)
  @Get('/search')
  searchUser(@Query('name') name: string) {
    return this.userService.searchUser(name)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
