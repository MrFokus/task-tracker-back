import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepo: Repository<Attachment>
  ){}
  create(createAttachmentDto: CreateAttachmentDto) {
    return 'This action adds a new attachment';
  }

  findAll() {
    return `This action returns all attachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return `This action updates a #${id} attachment`;
  }

  async remove(id: number) {
    let task = await this.attachmentRepo.findOne({
      relations: {
        task:true
      },
      where:{
        id:id
      }
    })
    let res = this.attachmentRepo.delete(id)
    return task
  }
}
