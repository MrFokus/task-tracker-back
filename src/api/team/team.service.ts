import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { DataSource, Equal, In, Like, Or, Repository } from 'typeorm';
import { ParticipatesTeam } from '../otherEntities/participatesTeam.entity';
import groupBy from 'src/mixin/groupBy';
import { IUser } from '../types/user';
import { Project } from '../project/project.entity';

@Injectable()
export class TeamService {

  constructor(
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
    @InjectRepository(ParticipatesTeam)
    private participatesRepo: Repository<ParticipatesTeam>,
    private dataSource: DataSource
  ) { }

  async create(createTeamDto: CreateTeamDto, userId: number) {
    // console.log(createTeamDto);
    // let existTeamNames = (await this.getTeamForUser(userId)).filter(el => {
    //   if (el.team_name === createTeamDto.name) {
    //     return el.team_name
    //   }
    // })

    // if (existTeamNames.length) {
    //   return new BadRequestException('Team exist for current user')
    // }
    let team = await this.teamRepo.save({ name: createTeamDto.name, photo: createTeamDto.photo })
    let participates = await this.participatesRepo.save(createTeamDto.participates.map((el)=>({user:{id:el.id},role:{id:el.role},team:{id:team.id}})));
    return { ...team, participates }
  }

  async findByTeam(id: number) {
    let result = await this.teamRepo.findOne({
      relations: {
        participatesTeam: {
          role:true,
          user:true,
        },
        projects: true,
      },
      where: {
        id: id
      }
    })

    return result
  }

  async getTeamForUser(userId: number): Promise<any[]> {
    return await this.participatesRepo
      .createQueryBuilder('participates')
      .leftJoinAndSelect('participates.team', 'team')
      .select(['participates.team_id  as "team_id"', 'team.name as team_name'])
      .where('participates.user_id = :userId', { userId })
      .getRawMany()
  }

  async findAllForUser(userId: number) {

    let teams = (await this.getTeamForUser(userId)).map(el => +el.team_id)

    if (!teams.length) {
      return []
    }

    let result = (await this.participatesRepo
      .createQueryBuilder('participates')
      .innerJoinAndSelect('participates.user', 'user')
      .innerJoinAndSelect('participates.team', 'team')
      .innerJoinAndSelect('participates.role', 'role')
      // .leftJoinAndSelect('team.projects','projects')
      .select(['user.name', 'team.name', 'role.name', 'team.id', 'user.id', 'user.photo'])
      .where('participates.team_id IN (:...teamId)', { teamId: teams })
      .getRawMany())

    console.log(result);

    result = Object.values(groupBy(result, 'team_id')).map((el: { team_name: string, team_id: number, user_name: string, role_name: string, user_id: number, user_photo?: string, projects_id: number, projects_name: string }[]) => {
      return {
        teamName: el[el.length - 1].team_name,
        teamId: el[el.length - 1].team_id,
        users: [...el].map(el => {
          return {
            id: el.user_id,
            name: el.user_name,
            role: el.role_name,
          }
        })
      }
    })

    return result
  }

  async getProjectsForTeam(teamId: number) {
    let result = await this.teamRepo.findOne({ relations: { projects: true }, where: { id: teamId }, })
    return Array.from(result.projects)
  }

  async searchTeam(name: string, userId: number) {
    return (await this.teamRepo.find({
      select: ['id', 'name', 'photo'],
      relations: {
        participatesTeam: true,
      },
      where: {
        participatesTeam: {
          user: { id: userId },
          role: { id: Or(Equal(1), Equal(2)) }
        },
        name: Like(`%${name}%`)
      }
    }))
  }

  async getUserTeam(teamId: number) {
    return this.participatesRepo.find({
      select:['user'],
      relations: {
        user: true,
        team:true
      },
      where: {
        team: {
          id:teamId
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
