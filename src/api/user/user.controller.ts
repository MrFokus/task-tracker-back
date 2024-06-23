import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query, UseInterceptors, UploadedFile, Req, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/mixin/editFileName';
import { IUser } from '../types/user';
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
  @Get(':id')
  getOne(@Param('id') id:string) {
    return this.userService.findOne(+id)
  }

  // @Get('/project')
  // getUserInProject(@Query('projectId') projectId: number) {
  //   return this.userService.getUserInProject(+projectId)
  // }

  @Patch()
  update( @Req() { user }: {user: IUser }, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+user.sub, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './uploads/',
        filename: editFileName,
      }),
      //   fileFilter: imageFileFilter,
    }),
  )
  uploadMultipleFiles(@UploadedFiles() file, @Req() { user }: {user: IUser }) {
    return this.userService.uploadFile(file,user.sub)
  }
}
