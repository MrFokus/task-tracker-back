import { GroupService } from './../group/group.service';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/team.entity';
import { Group } from '../group/group.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,

    private groupService: GroupService
  ) { }

  async create(createProjectDto: CreateProjectDto) {

    const INIT_GROUP = [
      {
        name: 'Запланировано'
      },
      {
        name: 'В работе'
      },
      {
        name: 'Выполнено'
      },
    ]

    try {
      let project = await this.projectRepo.save({
        name: createProjectDto.name,
        photo: createProjectDto.photo,
        dateCreate: new Date().toISOString()
      })

      for (let i = 0; i < INIT_GROUP.length; i++) {
        await this.groupService.create({ projectId: project.id, ...INIT_GROUP[i] });
      }

      let team = await this.teamRepo.findOne({
        where: { id: createProjectDto.teamId },
        relations: ['projects']
      });

      if (!team) {
        throw new NotFoundException(`team ${createProjectDto.teamId} not found`)
      }
      if (!Array.isArray(team.projects)) {
        team.projects = [];
      }
      team.projects.push(project);
      await this.teamRepo.save(team)
      return project
    }
    catch (e) {
      console.log(e);
    }

  }

  findAll() {
    return `This action returns all project`;
  }

  async projectExistenceForUser(id) {
    return await this.projectRepo.findOneBy({
      id: +id,
    })
  }

  async findOne(id: number) {
    let res = await this.projectRepo.findOne({
      relations: {
        groups: true
      },
      where: {
        id: id,
        groups: {
          projectId: id
        }
      }
    })
    console.log(res);
    res.groups.sort((a: Group, b: Group) => {
      const order = ['Запланировано', 'В работе', 'Выполнено'].reverse();
      return order.indexOf(b.name) - order.indexOf(a.name);
    });

    return res

  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
