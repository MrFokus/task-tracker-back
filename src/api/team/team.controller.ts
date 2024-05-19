import { IUser } from './../types/user';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto,@Req() {user}: {user: IUser }) {
    return this.teamService.create(createTeamDto,user.sub);
  }
  @Get('/search')
  searchUser(@Query('name') name: string, @Req() { user }: {user: IUser }) {
    return this.teamService.searchTeam(name,user.sub)
  }

  @Get()
  findAllForUser(@Req() { user }: {user: IUser }) {
    return this.teamService.findAllForUser(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findByTeam(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
