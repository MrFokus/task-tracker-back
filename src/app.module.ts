import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AttachmentModule } from './api/attachment/attachment.module';
import { GroupModule } from './api/group/group.module';
import { MarkModule } from './api/mark/mark.module';
import { ProjectModule } from './api/project/project.module';
import { SubtaskModule } from './api/subtask/subtask.module';
import { TaskModule } from './api/task/task.module';
import { TeamModule } from './api/team/team.module';
import { User } from './api/user/user.entity';
import { Attachment } from './api/attachment/attachment.entity';
import { Group } from './api/group/group.entity';
import { Mark } from './api/mark/mark.entity';
import { Project } from './api/project/project.entity';
import { Subtask } from './api/subtask/subtask.entity';
import { Task } from './api/task/task.entity';
import { Team } from './api/team/team.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User,Attachment,Group,Mark,Project,Subtask,Task,Team],
        synchronize: true,
        autoLoadEntities:true,
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AttachmentModule,
    GroupModule,
    MarkModule,
    ProjectModule,
    SubtaskModule,
    TaskModule,
    TeamModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
