import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.model';
import { Model } from 'mongoose';
import { Level } from './level.model';

@Injectable()
export class LevelsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Level.name) private levelModel: Model<Level>,
  ) {
  }

  async findUser(id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException({
        message: `ID must be integer, try again`,
      });
      return;
    }
    const user = await this.userModel.findOne({ id });

    if (!user) {
      throw new NotFoundException({
        message: `User with id ${id} not found in database`,
      });
    }

    return user;
  }

  async setLevel(id: string, quizId: string, level: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException({
        message: `ID must be integer, try again`,
      });
      return;
    }

    const user = await this.findUser(id);

    const nextLevel = parseInt(level) + 1;
    const exist = await this.levelModel.findOne({ id, quizId });

    if (!exist) {
      await this.levelModel.create({
        id, quizId, level,
      });
    } else {
      await this.levelModel.updateOne({ id, quizId }, { id, quizId, level });
    }

    return {
      level
    }
  }
}
