import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { QuestionModule } from './question/question.module';
import { LevelsModule } from './levels/levels.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
      UsersModule,
      MongooseModule.forRoot("mongodb+srv://antonyaneric:Erik$2008@cluster0.hfvu6sp.mongodb.net/grayquizz?retryWrites=true&w=majority&appName=Cluster0"),
      QuestionModule,
      LevelsModule,
      QuizModule
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
