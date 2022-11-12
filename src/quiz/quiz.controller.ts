import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDTO } from 'src/utils/dto/quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getQuizes() {
    return this.quizService.getQuizes();
  }

  @Get(':id')
  async getQuiz(id: string) {
    return this.quizService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addQuiz(@Request() req, @Body() quiz: QuizDTO) {
    console.log(req.user.id);

    const userId = req.user.id;
    return this.quizService.createQuiz(quiz, userId);
  }
}
