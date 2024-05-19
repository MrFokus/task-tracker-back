import { RoleService } from './role.service';
import { RoleController } from './role.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [
        RoleController,],
    providers: [
        RoleService,],
})
export class RoleModule { }
