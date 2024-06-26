import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ProjectWsGateway } from '../project/project-ws.gateway';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService, private readonly ws:ProjectWsGateway) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto).then(() => {
      this.ws.refresh(createGroupDto.projectId.toString())
    })
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.groupService.remove(+id);
    this.ws.refresh(res.projectId.toString());
    return res
  }
}
