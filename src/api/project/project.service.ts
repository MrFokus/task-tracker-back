import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/team.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    try {
      let project = await this.projectRepo.save({
        name: createProjectDto.name,
        photo: createProjectDto.photo,
        dateCreate: new Date().toISOString()
      })

      let team = await this.teamRepo.findOneBy({
        id: createProjectDto.teamId
      })

      if (!team) {
        return new NotFoundException(`team ${createProjectDto.teamId} not found`)
      }
      team.projects = [project]
      await this.teamRepo.save(team)
      return project
    }
    catch (e) {
      return new InternalServerErrorException()
    }

  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
