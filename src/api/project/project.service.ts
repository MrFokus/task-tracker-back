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
    const INIT_GROUP = this.groupService.INIT_GROUP
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
        groups: true,
        teams: true,
        tasks: {
          subtasks: true,
          attachments: true,
          participants: true,
          marks: true,
          column: true,
        }
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
    res.tasks.map(t => {
      return t.participants.map(p => {
        if (p.photo)
          p.photo = process.env.PATH_FILE + p.photo
        return p
      })
    })

    return res

  }



async update(id: number, updateProjectDto: UpdateProjectDto) {

}

remove(id: number) {
  return `This action removes a #${id} project`;
}
  async uploadFile(file, projectId) {
  let project = await this.projectRepo.findOneBy({
    id: projectId
  })
  if (project) {
    project.photo = file[0].filename
    this.projectRepo.save(project)
  }
  return process.env.PATH_FILE + project.photo
}
}
