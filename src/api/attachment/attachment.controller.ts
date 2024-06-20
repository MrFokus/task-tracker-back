import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { ProjectWsGateway } from '../project/project-ws.gateway';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService, private readonly ws: ProjectWsGateway) {}

  @Post()
  create(@Body() createAttachmentDto: CreateAttachmentDto) {
    return this.attachmentService.create(createAttachmentDto);
  }

  @Get()
  findAll() {
    return this.attachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentService.update(+id, updateAttachmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let res = await this.attachmentService.remove(+id);
    if (res.task.id) {
      this.ws.refresh(res.task.id.toString())
    }
    return res
  }
}
