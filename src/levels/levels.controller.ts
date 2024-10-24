import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { LevelsService } from './levels.service';

@Controller('levels')
export class LevelsController {
  constructor(
    private levelService: LevelsService
  ) {
  }
  @Get(":id/:quizzId/:level")
  async setLevel(@Param("id") id: string, @Param("quizId") quizId: string, @Param("level") level: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException({
        message: `ID must be integer, try again`,
      });
      return;
    }

    if (isNaN(Number(level))) {
      throw new BadRequestException({
        message: `level must be integer, try again`,
      });
      return;
    }

    return this.levelService.setLevel(id, quizId, level)
  }

  @Get(":id/:quizzId/:level")
  async getLevel(@Param("id") id: string, @Param("quizId") quizId: string) {

  }
}
