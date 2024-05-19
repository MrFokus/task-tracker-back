/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('role')
export class RoleController {

    constructor(
        private readonly roleService: RoleService
    ){}


    @Get()
    @UseGuards(AuthGuard)
    getAllRoles() {
        return this.roleService.getAll()
    }
}
