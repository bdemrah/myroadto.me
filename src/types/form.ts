export interface BaseAnswers {
  currentSituation: string;
  currentIncome: string;
  stressorsAndExciters: string;
  futureGoalsAndObstacles: string;
  naturalTalents: string;
  mood: MoodType;
  motivation: MotivationType;
  workStyle: WorkStyleType;
  decisionMaking: DecisionMakingType;
}

export interface ConditionalAnswers {
  // Mood-based questions
  uncertaintyAreas?: string[];
  riskTolerance?: string;
  
  // Motivation-based questions
  financialFlexibility?: string;
  transitionStrategy?: string;
  entrepreneurship?: string;
  
  // Situation-based questions
  jobSearchChallenges?: string;
  learningPriorities?: string;
  currentJobDisappointment?: string;
  idealWorkEnvironment?: string;
  
  // Work style based questions
  creativeProcess?: string;
  problemSolving?: string;
}

export interface FormData {
  language: 'tr' | 'en';
  baseAnswers: BaseAnswers;
  conditionalAnswers: ConditionalAnswers;
  currentIncome: string;
}

export type MoodType = 
  | 'Enerjik' 
  | 'Sakin' 
  | 'Kaygılı' 
  | 'Kararsız' 
  | 'Huzurlu' 
  | 'Heyecanlı' 
  | 'Yorgun' 
  | 'Umutsuz';

export type MotivationType = 
  | 'Başarı' 
  | 'Para/Güvenlik' 
  | 'Takdir' 
  | 'Özgürlük' 
  | 'Öğrenme' 
  | 'Etki yaratmak' 
  | 'Yaratıcılık';

export type WorkStyleType = 
  | 'Disiplinli/Planlı' 
  | 'Esnek/Spontane' 
  | 'Sistematik/Analitik' 
  | 'Yaratıcı/Sezgisel';

export type DecisionMakingType = 
  | 'Mantık odaklı araştırma' 
  | 'Duygu odaklı sezgi' 
  | 'İkisini dengelerim' 
  | 'Başkalarının fikrini alırım';

export interface FormQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  options?: string[];
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}
