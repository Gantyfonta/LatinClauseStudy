
export enum ClauseType {
  INDIRECT_STATEMENT = 'Indirect Statement',
  PURPOSE_CLAUSE = 'Purpose Clause',
  INDIRECT_COMMAND = 'Indirect Command',
  ADVERBIAL_RESULT = 'Adverbial Result',
  FEARING_CLAUSE = 'Fearing Clause',
  NOUN_RESULT = 'Noun Result',
  NAMELY_THAT = 'Namely-That Clause',
  CUM_TEMPORAL = 'Cum Temporal',
  CUM_CIRCUMSTANTIAL = 'Cum Circumstantial',
  CUM_CAUSAL = 'Cum Causal',
  CUM_CONCESSIVE = 'Cum Concessive'
}

export interface LatinQuestion {
  latin: string;
  translation: string;
  correctCategory: ClauseType;
  explanation: string;
  hint: string;
}

export interface GameState {
  currentQuestion: LatinQuestion | null;
  score: number;
  totalAnswered: number;
  isGameOver: boolean;
  lastAnswerCorrect: boolean | null;
  showExplanation: boolean;
}
