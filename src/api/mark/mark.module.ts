import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';

@Module({
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
