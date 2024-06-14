import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './mark.entity';
import { ProjectModule } from '../project/project.module';

@Module({
  imports:[TypeOrmModule.forFeature([Mark]),ProjectModule],
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
