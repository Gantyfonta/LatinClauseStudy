
import { ClauseType, LatinQuestion } from './types';

export const CLAUSE_DESCRIPTIONS: Record<ClauseType, string> = {
  [ClauseType.INDIRECT_STATEMENT]: "Accusative subject + Infinitive verb, introduced by a 'verb of the head'.",
  [ClauseType.PURPOSE_CLAUSE]: "ut/ne + subjunctive. Translated as 'so that' or 'in order to'.",
  [ClauseType.INDIRECT_COMMAND]: "MORPHIA P words (Moneo, Oro, Rogo, Persuadeo, Horto, Impero, Admoneo) + ut/ne + subjunctive.",
  [ClauseType.ADVERBIAL_RESULT]: "Indicator words (tam, tot, ita, sic, tantus) + ut/ut...non + subjunctive. 'So [x] that...'",
  [ClauseType.FEARING_CLAUSE]: "Verb of fearing + ne (positive) / ut (denying) + subjunctive.",
  [ClauseType.NOUN_RESULT]: "Special verbs (accido, fio, facio, efficio) + ut/ne + subjunctive.",
  [ClauseType.NAMELY_THAT]: "Explanatory ut/ne + subjunctive. Similar to purpose but specifies a noun.",
  [ClauseType.CUM_TEMPORAL]: "Cum + Indicative verb. Translated as 'When'.",
  [ClauseType.CUM_CIRCUMSTANTIAL]: "Cum + Subjunctive verb. Describes the circumstances ('When').",
  [ClauseType.CUM_CAUSAL]: "Cum + Subjunctive verb. Translated as 'Since' or 'Because'.",
  [ClauseType.CUM_CONCESSIVE]: "Cum + Subjunctive verb (often with tamen). Translated as 'Although'."
};

export const INITIAL_QUESTIONS: LatinQuestion[] = [
  {
    latin: "Dico me esse fortem.",
    translation: "I say that I am brave.",
    correctCategory: ClauseType.INDIRECT_STATEMENT,
    explanation: "This is an Indirect Statement because it uses an accusative subject ('me') and an infinitive ('esse') following a verb of speaking ('dico').",
    hint: "Look for an accusative and an infinitive following 'Dico'."
  },
  {
    latin: "Veni ut te viderem.",
    translation: "I came so that I might see you.",
    correctCategory: ClauseType.PURPOSE_CLAUSE,
    explanation: "This is a Purpose Clause: it uses 'ut' + the subjunctive 'viderem' to express the goal of the action.",
    hint: "'ut' + subjunctive without an indicator word like 'tam'."
  },
  {
    latin: "Tam fessus erat ut dormiret.",
    translation: "He was so tired that he slept.",
    correctCategory: ClauseType.ADVERBIAL_RESULT,
    explanation: "The word 'tam' (so) acts as an indicator for an Adverbial Result clause followed by 'ut' and the subjunctive.",
    hint: "Notice the word 'tam' (so)."
  },
  {
    latin: "Rogo ut maneas.",
    translation: "I ask that you stay.",
    correctCategory: ClauseType.INDIRECT_COMMAND,
    explanation: "The verb 'rogo' (I ask) is one of the MORPHIA P words that triggers an Indirect Command with 'ut'.",
    hint: "'Rogo' is a verb of command/request."
  },
  {
    latin: "Timeo ne veniat.",
    translation: "I fear that he is coming.",
    correctCategory: ClauseType.FEARING_CLAUSE,
    explanation: "A verb of fearing ('timeo') followed by 'ne' indicates a Fearing Clause (where 'ne' is positive).",
    hint: "Starts with 'Timeo' (I fear)."
  },
  {
    latin: "Accidit ut luna plena esset.",
    translation: "It happened that the moon was full.",
    correctCategory: ClauseType.NOUN_RESULT,
    explanation: "'Accidit' (it happens) is a special verb that takes a Noun Result clause as its subject.",
    hint: "'Accidit' means 'it happened'."
  },
  {
    latin: "Cum Caesar venisset, hostes fugerunt.",
    translation: "When Caesar had come, the enemies fled.",
    correctCategory: ClauseType.CUM_CIRCUMSTANTIAL,
    explanation: "'Cum' + subjunctive 'venisset' describing the circumstances under which the main action happened.",
    hint: "Cum + subjunctive, translated as 'When'."
  }
];
