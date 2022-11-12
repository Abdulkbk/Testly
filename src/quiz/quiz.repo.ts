import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { QuizDTO } from 'src/utils/dto/quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export class QuizRepository {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async findOne(quizFilterQuery: FilterQuery<Quiz>): Promise<Quiz> {
    return this.quizModel.findOne(quizFilterQuery);
  }

  async find(quizFilterQuery: FilterQuery<Quiz>): Promise<Quiz[]> {
    return this.quizModel.find(quizFilterQuery);
  }

  async findOneById(quizFilterQuery: FilterQuery<Quiz>): Promise<Quiz> {
    return this.quizModel.findById(quizFilterQuery);
  }

  async createOne(quiz: QuizDTO, user: any): Promise<Quiz> {
    const newQuiz = new this.quizModel(quiz, user);
    newQuiz.creator = user;
    return newQuiz.save();
  }

  async findOneAndUpdate(
    quizFilterQuery: FilterQuery<Quiz>,
    quiz: Partial<Quiz>,
  ): Promise<Quiz> {
    return this.quizModel.findOneAndUpdate(quizFilterQuery, quiz);
  }

  async findOneAndDelete(quizFilterQuery: FilterQuery<Quiz>): Promise<any> {
    return this.quizModel.findByIdAndDelete(quizFilterQuery);
  }
}
