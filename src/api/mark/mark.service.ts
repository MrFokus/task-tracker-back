import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { Repository } from 'typeorm';
import { Mark } from './mark.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class MarkService {
  constructor(
    @InjectRepository(Mark)
    private markRepo: Repository<Mark>,
    private projectService:ProjectService
  ){}
  async create(createMarkDto: CreateMarkDto) {
    let project = await this.projectService.findOne(createMarkDto.projectId)
    if (project) {
      return this.markRepo.save({
        name: createMarkDto.name,
        color: createMarkDto.color,
        background: createMarkDto.background,
        project: project
      })
    }
    else {
      throw new BadRequestException('Project not found')
    }
  }

  findAll(projectId:number) {
    return this.markRepo.findBy({
      project: {id: projectId }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} mark`;
  }

  update(id: number, updateMarkDto: UpdateMarkDto) {
    return `This action updates a #${id} mark`;
  }

  remove(id: number) {
    return `This action removes a #${id} mark`;
  }
}
