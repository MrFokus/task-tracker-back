import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { Team } from '../team/team.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project,Team])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
