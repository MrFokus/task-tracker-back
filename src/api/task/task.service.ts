import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { getRepository, Repository } from 'typeorm';
import { Mark } from '../mark/mark.entity';
import { User } from '../user/user.entity';
import { Subtask } from '../subtask/subtask.entity';
import { Group } from '../group/group.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(Mark)
    private markRepo: Repository<Mark>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Subtask)
    private subTaskRepo: Repository<Subtask>,
    @InjectRepository(Group)
    private groupRepo: Repository<Group>

  ) { }
  async create(createTaskDto: CreateTaskDto) {
    let task = await this.taskRepo.save({
      project: { id: createTaskDto.projectId },
      description: createTaskDto.description,
      column: { id: createTaskDto.groupId },
      name: createTaskDto.name,
      dateCreate: new Date().toISOString(),
      dateEnd: new Date(createTaskDto.dateEnd).toISOString(),
      label: createTaskDto.label,
    })
    let marksId: { id: number }[] = createTaskDto.marks.map(m => ({ id: m.id }))
    let marks = await this.markRepo.find({
      where: marksId
    })
    task.marks = marks

    let participantsId :{ id: number }[] = createTaskDto.participants.map(p => ({ id: p.id }))
    let participants = await this.userRepo.find({
      where: participantsId
    })
    task.participants = participants
    let res = await this.subTaskRepo.save(createTaskDto.checkList.map(st => ({ name: st.name, status: st.status, task: task })))
    console.log(res);
    
    await this.taskRepo.save(task)
    return task
  }

  findAll() {
    return ''
  }

  findOne(id: number) {
    return this.taskRepo.findOne({
      relations: {
        marks:true,
        subtasks: true,
        attachments: true,
        participants: true,
        column:true
      },
      where: {
        id:id
      }
    })
  }

  async swapGroup(idTask: number, idGroup: number) {
    console.log(idTask,idGroup);
    
    let task = await this.taskRepo.findOne({
      relations: {
        project:true
      },
      where: {
        id: idTask
      }
    })
    let group = await this.groupRepo.findOneBy({
      id:idGroup
    })

    if (task && group) {
      task.column = group
    }

    
    return this.taskRepo.save(task)
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    let task = await this.taskRepo.save({
      id:id,
      project: { id: updateTaskDto.projectId },
      description: updateTaskDto.description,
      column: { id: updateTaskDto.groupId },
      name: updateTaskDto.name,
      dateCreate: new Date().toISOString(),
      dateEnd: new Date(updateTaskDto.dateEnd).toISOString(),
      label: updateTaskDto.label,
    })
    if (updateTaskDto.marks.length) {
      let marksId: { id: number }[] = updateTaskDto.marks.map(m => ({ id: m.id }))
      let marks = await this.markRepo.find({
        where: marksId
      })
      task.marks = marks

    }
    else {
      task.marks = []
    }
    
    if (updateTaskDto.participants.length) {
      let participantsId: { id: number }[] = updateTaskDto.participants.map(p => ({ id: p.id }))
      let participants = await this.userRepo.find({
        where: participantsId
      })
      task.participants = participants

    }
    else {
      task.participants = []
      
    }
    let res = await this.subTaskRepo.save(updateTaskDto.checkList.map(st => ({id: st.id, name: st.name, status: st.status, task: task })))
    console.log(res);
    
    await this.taskRepo.save(task)
    return task
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
