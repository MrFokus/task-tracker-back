/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepo: Repository<Role>
    ){}

    async getAll() {
        return await this.roleRepo.find()
    }
}
