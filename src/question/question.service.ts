import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Question } from "./question.model";
import { Model } from "mongoose";
import { Quiz } from "./quiz.model";

@Injectable()
export class QuestionService {
  constructor(
      @InjectModel(Question.name) private questionModel: Model<Question>,
      @InjectModel(Quiz.name) private quizModel: Model<Quiz>
  ) {}

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
    });

    return newQuestion; // Return the created question
  }

  async findAll() {
    const questions = await this.quizModel.find().exec();
    return questions; // Return the list of questions
  }

  async findOne(id: string) { // Use string as id in MongoDB
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new Error(`Question with id ${id} not found`);
    }
    return question; // Return the found question
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(
        id,
        {
          task: updateQuestionDto.task,
          correct: Number(updateQuestionDto.correct) - 1,
          answers: [
            updateQuestionDto.answer_1,
            updateQuestionDto.answer_2,
            updateQuestionDto.answer_3
          ],
          group: updateQuestionDto.group,
        },
        { new: true } // Return the updated document
    ).exec();

    return updatedQuestion; // Return the updated question
  }

  async remove(id: string) {
    const deletedQuestion = await this.questionModel.findByIdAndDelete(id).exec();
    if (!deletedQuestion) {
      throw new Error(`Question with id ${id} not found`);
    }
    return deletedQuestion; // Return the deleted question
  }
}
