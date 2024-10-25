import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Question } from "./question.model";
import { Model } from "mongoose";
import { Quiz } from "../quiz/quiz.model";

@Injectable()
export class QuestionService {
  constructor(
      @InjectModel(Question.name) private questionModel: Model<Question>,

  ) {}

  async findAll() {
    const questions = await this.questionModel.find().exec();

    return questions; // Return the list of questions
  }
}
