import { RoleService } from './role.service';
import { RoleController } from './role.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        RoleController,],
    providers: [
        RoleService,],
})
export class RoleModule { }
