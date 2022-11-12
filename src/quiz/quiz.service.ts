import { Injectable } from '@nestjs/common';
import { QuizDTO } from 'src/utils/dto/quiz.dto';
import { QuizRepository } from './quiz.repo';
import { Quiz } from './schemas/quiz.schema';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepo: QuizRepository) {}

  async getOne(id: string): Promise<Quiz> {
    return this.quizRepo.findOne({ id });
  }

  async getQuizes(): Promise<Quiz[]> {
    return this.quizRepo.find({});
  }

  async createQuiz(quiz: QuizDTO, user_id: string): Promise<Quiz> {
    return this.quizRepo.createOne(quiz, user_id);
  }

  async deleteQuiz(id: string) {
    return this.deleteQuiz(id);
  }
}
