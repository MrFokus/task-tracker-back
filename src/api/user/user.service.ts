import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
