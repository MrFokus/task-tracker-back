import { ParticipatesTeam } from './../otherEntities/participatesTeam.entity';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { AuthService } from '../auth/auth.service';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {

  }
  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, +process.env.PASSWORD_HASH_SALT);
      let existUser = await this.userRepository.find({
        where: {
          login: createUserDto.login,
          mail: createUserDto.mail,
        }
      })
      if (existUser.length > 0) {
        throw new BadRequestException('User alredy exist')
      }
      await this.userRepository.save({ ...createUserDto, password: hash })
      return await this.authService.auth({ login: createUserDto.login, password: createUserDto.password })
    }
    catch (e) {
      return e
    }
  }

  async getUserByToken(token: string) {
    try {
      token = token.replace('Bearer ', '')
      let userFromToken = await this.authService.JwtVerify(token)
      console.log(userFromToken);

      let user = await this.userRepository.findOne({
        where: {
          id: userFromToken.sub
        }
      })
      console.log(user);

      return {
        name: user.name,
        mail: user.mail,
        photo:user.photo?process.env.PATH_FILE +user.photo:undefined
      }
    }
    catch (e) {
      throw new UnauthorizedException()
    }

  }

  async searchUser(name: string) {
    let users = (await this.userRepository.find({where:[
      { name: Like(`%${name}%`), },
      { login: Like(`%${name}%`) }
    ]
    }))
    console.log(users);
    
    return users.map(user => ({...user, photo:user.photo?process.env.PATH_FILE +user.photo:undefined }))
  }

  async getUserInTeam(teamId: number) {
    // return this.userRepository.find({
    //   select: {
    //     participates: {
    //       user:true
    //     }
    //   },
    //   relations: {
    //     participates: {
    //       user:true,
    //       team: {
    //         projects: true
    //       }
    //     },
    //   },
    //   where: {
    //     participates: {
    //       team: {
    //         projects: {
    //           id:projectId
    //         }
            
    //       }
    //     },
    //   }
    // })
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    let hash 
    if(updateUserDto.password)
    hash = await bcrypt.hash(updateUserDto.password, +process.env.PASSWORD_HASH_SALT);
    let user = await this.userRepository.findOne({
      where: {
       id:id
      }
    })
    user.name = updateUserDto.name
    user.mail = updateUserDto.mail
    if(hash)
      user.password = hash
    return this.userRepository.save(user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async uploadFile(file, userId) {
    let user = await this.userRepository.findOneBy({
      id:userId
    })
    if (user) {
      user.photo = file[0].filename
      this.userRepository.save(user)
    }

    return process.env.PATH_FILE + user.photo
  }
}
