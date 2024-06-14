import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Controller('mark')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Post()
  create(@Body() createMarkDto: CreateMarkDto) {
    return this.markService.create(createMarkDto);
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
  remove(@Param('id') id: string) {
    return this.markService.remove(+id);
  }
}
