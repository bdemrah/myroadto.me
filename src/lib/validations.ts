import { z } from 'zod';

export const baseAnswersSchema = z.object({
  currentSituation: z.string().min(20, 'En az 20 karakter gerekli').max(500, 'Maksimum 500 karakter'),
  currentIncome: z.string().min(3, 'Gelir bilgisi gerekli').max(50, 'Maksimum 50 karakter'),
  stressorsAndExciters: z.string().min(20, 'En az 20 karakter gerekli').max(500, 'Maksimum 500 karakter'),
  futureGoalsAndObstacles: z.string().min(20, 'En az 20 karakter gerekli').max(500, 'Maksimum 500 karakter'),
  naturalTalents: z.string().min(20, 'En az 20 karakter gerekli').max(500, 'Maksimum 500 karakter'),
  mood: z.enum(['Enerjik', 'Sakin', 'Kaygılı', 'Kararsız', 'Huzurlu', 'Heyecanlı', 'Yorgun', 'Umutsuz', 
                'Energetic', 'Calm', 'Anxious', 'Indecisive', 'Peaceful', 'Excited', 'Tired', 'Hopeless']),
  motivation: z.enum(['Başarı', 'Para/Güvenlik', 'Takdir', 'Özgürlük', 'Öğrenme', 'Etki yaratmak', 'Yaratıcılık',
                      'Success', 'Money/Security', 'Recognition', 'Freedom', 'Learning', 'Making Impact', 'Creativity']),
  workStyle: z.enum(['Disiplinli/Planlı', 'Esnek/Spontane', 'Sistematik/Analitik', 'Yaratıcı/Sezgisel',
                     'Disciplined/Planned', 'Flexible/Spontaneous', 'Systematic/Analytical', 'Creative/Intuitive']),
  decisionMaking: z.enum(['Mantık odaklı araştırma', 'Duygu odaklı sezgi', 'İkisini dengelerim', 'Başkalarının fikrini alırım',
                          'Logic-focused research', 'Emotion-focused intuition', 'Balance both', 'Ask others\' opinions'])
});

export const conditionalAnswersSchema = z.object({
  uncertaintyAreas: z.array(z.string()).optional(),
  riskTolerance: z.string().optional(),
  financialFlexibility: z.string().optional(),
  transitionStrategy: z.string().optional(),
  entrepreneurship: z.string().optional(),
  jobSearchChallenges: z.string().min(10).max(300).optional(),
  learningPriorities: z.string().optional(),
  currentJobDisappointment: z.string().min(10).max(300).optional(),
  idealWorkEnvironment: z.string().optional(),
  creativeProcess: z.string().optional(),
  problemSolving: z.string().optional(),
});

export const formDataSchema = z.object({
  language: z.enum(['tr', 'en']),
  baseAnswers: baseAnswersSchema,
  conditionalAnswers: conditionalAnswersSchema,
  currentIncome: z.string().min(3).max(50),
});

export const paymentSessionSchema = z.object({
  packageType: z.enum(['basic', 'premium', 'pro']),
  language: z.enum(['tr', 'en']),
  email: z.string().email().optional(),
});

export const webhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.any(),
  }),
});
