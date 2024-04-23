import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './api/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
}
