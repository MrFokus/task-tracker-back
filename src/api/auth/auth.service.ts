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

        let user = await this.userReposytory.findOne({
            where: {
                login: authDto.login
            }
        })
        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        if (!(await bcrypt.compare(authDto.password, user.password))) {
            throw new UnauthorizedException('Incorrect password')
        }
        return {
            access_token: await this.jwtService.signAsync({sub:user.id, mail:user.mail, name:user.name})
        }
    }

    JwtDecode(token:string) {
        return this.jwtService.decode(token)
    }

    async JwtVerify(token: string) {
        return await this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET})
    }

}
