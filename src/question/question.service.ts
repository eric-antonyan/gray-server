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

  async create(createQuestionDto: CreateQuestionDto) {
    const customAnswers = [
      createQuestionDto.answer_1,
      createQuestionDto.answer_2,
      createQuestionDto.answer_3
    ];
    const newQuestion = await this.questionModel.create({
      task: createQuestionDto.task,
      correct: parseInt(createQuestionDto.correct) - 1, // Assuming index based
      answers: customAnswers,
      group: createQuestionDto.group,
      image: createQuestionDto.image
    });
    return newQuestion; // Return the created question
  }
}
