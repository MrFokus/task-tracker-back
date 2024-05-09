import { Body, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userReposytory: Repository<User>,
        private jwtService: JwtService
    ) { }

    async auth(authDto: AuthDto) {
        console.log(authDto);

        let user = await this.userReposytory
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.login = :login', { login: authDto.login })
            .getOne()

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        if (!(await bcrypt.compare(authDto.password, user.password))) {
            throw new UnauthorizedException('Incorrect password')
        }
        return {
            access_token: await this.writeToToken({ sub: user.id, mail: user.mail, name: user.name })
        }
    }

    async writeToToken(payload) {
        return await this.jwtService.signAsync(payload)
    }

    async JwtVerify(token: string) {
        return await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
    }

}
