import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { ProjectModule } from '../project/project.module';
import { Task } from '../task/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Group,Task]),forwardRef(() => ProjectModule)],
  controllers: [GroupController],
  providers: [GroupService],
  exports:[GroupService],
})
export class GroupModule {}
