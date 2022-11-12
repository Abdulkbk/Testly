import { OptionsType } from './../../utils/dto/quiz.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { AnswersType } from 'src/utils/dto/quiz.dto';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  creator: User;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: AnswersType;

  @Prop({ required: true })
  options: OptionsType;

  @Prop({ required: true })
  question_type: string;

  // @Prop({ required: true })
  // createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
