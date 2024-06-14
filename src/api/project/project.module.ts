import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Global, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { Team } from '../team/team.entity';
import { ProjectWsGateway } from './project-ws.gateway';
import { GroupModule } from '../group/group.module';
@Module({
  imports:[TypeOrmModule.forFeature([Project,Team]),forwardRef(() => GroupModule)],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectWsGateway],
  exports:[ProjectService,ProjectWsGateway]
})
export class ProjectModule {}
