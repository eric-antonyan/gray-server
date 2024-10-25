import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.model';
import { Quiz, QuizSchema } from '../quiz/quiz.model';
import { Question, QuestionSchema } from './question.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}