export class QuizDTO {
  question: string;
  answer: any;
  options: any;
  type: string;
}

export class AnswersType {
  answer?: string;
  ans?: boolean;
}

export class OptionsType {
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  answerBool?: boolean;
}
