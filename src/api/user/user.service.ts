import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { AuthService } from '../auth/auth.service';

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
        photo: user.photo
      }
    }
    catch (e) {
      throw new UnauthorizedException()
    }

  }

  async searchUser(name: string) {
    return (await this.userRepository.findBy({
      name: Like(`%${name}%`),
      login: Like(`%${name}%`)
    }))
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
