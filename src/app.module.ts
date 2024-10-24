import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
      UsersModule,
      MongooseModule.forRoot("mongodb+srv://antonyaneric:Erik$2008@cluster0.hfvu6sp.mongodb.net/grayquizz?retryWrites=true&w=majority&appName=Cluster0"),
      QuestionModule
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
