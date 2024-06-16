import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>
  ) { 
  }
  INIT_GROUP = [
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


  async create(createGroupDto: CreateGroupDto) {
    let group = await this.groupRepo.findOneBy({
      projectId: createGroupDto.projectId, name: createGroupDto.name
    })
    console.log(group);

    if (!group)
      return this.groupRepo.save({ projectId: createGroupDto.projectId, name: createGroupDto.name })
    else
      throw new ConflictException
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    let group = await this.groupRepo.findOneBy({
      id: id
    })
    if(!this.INIT_GROUP.find(el=>el.name == group.name))
    await this.groupRepo.delete(id)
    return group
  }
}
