import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { ParticipatesTeam } from '../otherEntities/participatesTeam.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Team,ParticipatesTeam])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
