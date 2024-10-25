import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {
  }
  @Get(":quizId/find")
  async findOne(@Param("quizId") quizId: string) {
    return this.quizService.findOne(quizId);
  }

  @Get(":id")
  async findAll(@Param("id") id: string) {
    console.log(id);
    const quizzes = await this.quizService.findAll(id);
    return quizzes;
  }
}
