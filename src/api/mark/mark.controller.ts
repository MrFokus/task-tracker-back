import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { ProjectWsGateway } from '../project/project-ws.gateway';

@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService, private readonly ws: ProjectWsGateway) {}

  @Post()
  async create(@Body() createMarkDto: CreateMarkDto) {
    let res = await this.markService.create(createMarkDto);
    if (res?.project?.id) {
      this.ws.refresh( res.project.id.toString())
    }
    return res
  }

  @Get()
  findAll(@Query('projectId') projectId:string) {
    return this.markService.findAll(+projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarkDto: UpdateMarkDto) {
    return this.markService.update(+id, updateMarkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let res = await this.markService.remove(+id);
    this.ws.refresh(res.projectId.toString())
    return res
  }
}
