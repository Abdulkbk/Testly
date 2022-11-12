import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';

console.log(process.env.MONGO_URI);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UsersModule,
    QuizModule,
  ],
  controllers: [AppController, UsersController, QuizController],
  providers: [AppService],
})
export class AppModule {}
