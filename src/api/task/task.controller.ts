import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ProjectWsGateway } from '../project/project-ws.gateway';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/mixin/editFileName';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly ws: ProjectWsGateway) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    let res = await this.taskService.create(createTaskDto);
    this.ws.refresh(res.project.id.toString())
    return res
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    let res = await this.taskService.update(+id, updateTaskDto);
    this.ws.refresh(res.project.id.toString())
    return res
  }

  @Put('/swap-group')
  async swapGroup(@Body() body: { taskId: number, groupId: number }) {
    let res = await this.taskService.swapGroup(body.taskId, body.groupId);
    this.ws.refresh(res.project.id.toString())
    return res
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
  @Post('upload/:id')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads/',
        filename: editFileName,
      }),
      //   fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@Param('id') taskId: number, @UploadedFiles() files) {
    console.log(files);
    
    let res = await this.taskService.uploadFiles(files, taskId)
    this.ws.refresh(res.project.id.toString())
  }
}
