import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Mark } from '../mark/mark.entity';
import { User } from '../user/user.entity';
import { Subtask } from '../subtask/subtask.entity';
import { ProjectModule } from '../project/project.module';
import { Group } from '../group/group.entity';
import { Attachment } from '../attachment/attachment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Task,Mark,User,Subtask,Group,Attachment]),ProjectModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
