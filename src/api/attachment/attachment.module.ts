import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { ProjectWsGateway } from '../project/project-ws.gateway';
import { ProjectModule } from '../project/project.module';

@Module({
  imports:[TypeOrmModule.forFeature([Attachment]),ProjectModule],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
