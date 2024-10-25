import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './quiz.model';
import { Question, QuestionSchema } from '../question/question.model';
import { User, UserSchema } from '../users/user.model';
import { Level, LevelSchema } from '../levels/level.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quiz.name,
        schema: QuizSchema
      },
      {
        name: Question.name,
        schema: QuestionSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Level.name,
        schema: LevelSchema
      }
    ])
  ],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
