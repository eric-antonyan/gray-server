import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.model';
import { Question } from '../question/question.model';
import { User } from '../users/user.model';
import { Level } from '../levels/level.model';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Level.name) private levelModel: Model<Level>,
  ) {
  }

  async clear(id: string) {
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

    const updated = await this.levelModel.deleteMany({ id });
    const balanceUpdated = await this.userModel.updateOne({ id }, { balance: 0 });

    if (updated && balanceUpdated) {
      const questions = await this.findAll(id);
      return questions;
    }
  }

  async findAll(id: string): Promise<{ quiz: Quiz; size: number }[]> {
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

    const quizzes = await this.quizModel.find();

    // Create an array of promises for counting documents
    const sizePromises = quizzes.map(async (quiz) => {
      const size = await this.questionModel.countDocuments({ group: quiz.uuid });

      const level = await this.levelModel.findOne({ id, quizId: quiz.uuid });


      return { quiz, size, level: level ? level.level : 0 }; // Return the quiz along with its size
    });

    // Wait for all size promises to resolve
    const sizes = await Promise.all(sizePromises);

    console.log(sizes);

    return sizes;
  }

  async findOne(uuid: string) {
    const document = await this.questionModel.find({ group: uuid });
    return document;
  }

  async getAll(): Promise<Quiz[]> {
    const documents = await this.quizModel.find().exec();
    return documents;
  }
}
