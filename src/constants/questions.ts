import { FormQuestion, BaseAnswers } from '@/types/form';

export const BASE_QUESTIONS: Record<string, FormQuestion[]> = {
  tr: [
    {
      id: 'currentSituation',
      question: 'Şu anda hayatında ne yapıyorsun ve hangi noktada sıkışmış hissediyorsun?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'currentIncome',
      question: 'Mevcut aylık net gelirin ne kadar? (Maaş, freelance, yan gelir dahil)',
      type: 'text',
      required: true,
      validation: { minLength: 3, maxLength: 50 }
    },
    {
      id: 'stressorsAndExciters',
      question: 'Son 6 ayda seni en çok yoran ve en çok heyecanlandıran şeyler neler?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'futureGoalsAndObstacles',
      question: '1 yıl sonra nerede olmak istersin ve seni durduran en büyük engel ne?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'naturalTalents',
      question: 'Hangi konularda doğal yeteneğin var ve neyle uğraşırken zamanın nasıl geçtiğini fark etmiyorsun?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'mood',
      question: 'Günlük ruh hâlini en iyi tanımlayan ifade hangisi?',
      type: 'select',
      required: true,
      options: ['Enerjik', 'Sakin', 'Kaygılı', 'Kararsız', 'Huzurlu', 'Heyecanlı', 'Yorgun', 'Umutsuz']
    },
    {
      id: 'motivation',
      question: 'Seni en çok motive eden unsur nedir?',
      type: 'select',
      required: true,
      options: ['Başarı', 'Para/Güvenlik', 'Takdir', 'Özgürlük', 'Öğrenme', 'Etki yaratmak', 'Yaratıcılık']
    },
    {
      id: 'workStyle',
      question: 'Çalışma tarzını en iyi tanımlayan ifade hangisi?',
      type: 'select',
      required: true,
      options: ['Disiplinli/Planlı', 'Esnek/Spontane', 'Sistematik/Analitik', 'Yaratıcı/Sezgisel']
    },
    {
      id: 'decisionMaking',
      question: 'Karar verirken hangi yaklaşımı kullanırsın?',
      type: 'select',
      required: true,
      options: ['Mantık odaklı araştırma', 'Duygu odaklı sezgi', 'İkisini dengelerim', 'Başkalarının fikrini alırım']
    }
  ],
  en: [
    {
      id: 'currentSituation',
      question: 'What are you currently doing in life and where do you feel stuck?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'currentIncome',
      question: 'What is your current monthly net income? (Salary, freelance, side income included)',
      type: 'text',
      required: true,
      validation: { minLength: 3, maxLength: 50 }
    },
    {
      id: 'stressorsAndExciters',
      question: 'What have been the most exhausting and most exciting things for you in the last 6 months?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'futureGoalsAndObstacles',
      question: 'Where do you want to be in 1 year and what is the biggest obstacle stopping you?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'naturalTalents',
      question: 'What are your natural talents and what activities make you lose track of time?',
      type: 'textarea',
      required: true,
      validation: { minLength: 20, maxLength: 500 }
    },
    {
      id: 'mood',
      question: 'Which statement best describes your daily mood?',
      type: 'select',
      required: true,
      options: ['Energetic', 'Calm', 'Anxious', 'Indecisive', 'Peaceful', 'Excited', 'Tired', 'Hopeless']
    },
    {
      id: 'motivation',
      question: 'What motivates you the most?',
      type: 'select',
      required: true,
      options: ['Success', 'Money/Security', 'Recognition', 'Freedom', 'Learning', 'Making Impact', 'Creativity']
    },
    {
      id: 'workStyle',
      question: 'Which statement best describes your work style?',
      type: 'select',
      required: true,
      options: ['Disciplined/Planned', 'Flexible/Spontaneous', 'Systematic/Analytical', 'Creative/Intuitive']
    },
    {
      id: 'decisionMaking',
      question: 'What approach do you use when making decisions?',
      type: 'select',
      required: true,
      options: ['Logic-focused research', 'Emotion-focused intuition', 'Balance both', 'Ask others\' opinions']
    }
  ]
};

export const getConditionalQuestions = (answers: BaseAnswers, language: 'tr' | 'en'): FormQuestion[] => {
  const additional: FormQuestion[] = [];
  
  const questions = {
    tr: {
      uncertaintyAreas: {
        id: 'uncertaintyAreas',
        question: 'Bu kararsızlık/kaygı en çok hangi konularda kendini gösteriyor?',
        type: 'multiselect' as const,
        options: ['Kariyer seçimi', 'Finansal güvenlik', 'Aile beklentileri', 'Yeteneklerimi bilmeme', 'Başarısızlık korkusu']
      },
      riskTolerance: {
        id: 'riskTolerance',
        question: 'Risk alma konusunda kendini nasıl tanımlarsın?',
        type: 'select' as const,
        options: ['Çok riskli adımlar atabilirim', 'Hesaplı risk alırım', 'Güvenli yolları tercih ederim', 'Risk almaktan kaçınırım']
      },
      financialFlexibility: {
        id: 'financialFlexibility',
        question: 'Mevcut finansal durumun kariyer değişikliği için ne kadar esneklik tanıyor?',
        type: 'select' as const,
        options: ['Rahatça 12+ ay yaşarım', '6-12 ay idare ederim', '3-6 ay zorlanırım', 'Hemen gelir gerekiyor']
      },
      transitionStrategy: {
        id: 'transitionStrategy',
        question: 'Gelir kaybı riski almadan hangi geçiş stratejisini tercih edersin?',
        type: 'select' as const,
        options: ['Yan proje olarak başlayıp kademeli geçiş', '6 ay maaş garantili sabbatical', 'Hemen tam geçiş', 'Hiç risk almak istemiyorum']
      },
      entrepreneurship: {
        id: 'entrepreneurship',
        question: 'Kendi işini kurma konusunda ne düşünüyorsun?',
        type: 'select' as const,
        options: ['Çok istiyorum ama nasıl bilmiyorum', 'Araştırıyorum', 'Hiç düşünmedim', 'İstemiyorum']
      },
      jobSearchChallenges: {
        id: 'jobSearchChallenges',
        question: 'İş arama sürecinde seni en çok zorlayan şey ne?',
        type: 'textarea' as const,
        validation: { minLength: 10, maxLength: 300 }
      },
      learningPriorities: {
        id: 'learningPriorities',
        question: 'İlk işinde/projende en çok neyi öğrenmek istiyorsun?',
        type: 'select' as const,
        options: ['Teknik beceriler', 'Sektör bilgisi', 'İnsanlarla çalışma', 'Proje yönetimi', 'Satış/pazarlama']
      },
      currentJobDisappointment: {
        id: 'currentJobDisappointment',
        question: 'Mevcut işindeki en büyük hayal kırıklığın ne?',
        type: 'textarea' as const,
        validation: { minLength: 10, maxLength: 300 }
      },
      idealWorkEnvironment: {
        id: 'idealWorkEnvironment',
        question: 'İdeal çalışma ortamın nasıl olurdu?',
        type: 'select' as const,
        options: ['Remote', 'Ofis', 'Hibrit', 'Startup', 'Kurumsal', 'Freelance', 'Kendi işim']
      },
      creativeProcess: {
        id: 'creativeProcess',
        question: 'Yaratıcı projelerinde seni en çok heyecanlandıran süreç hangisi?',
        type: 'select' as const,
        options: ['Fikir bulma', 'Tasarlama/planlama', 'Uygulama', 'İnsanlara sunma', 'Geri bildirim alma']
      },
      problemSolving: {
        id: 'problemSolving',
        question: 'Karmaşık problemleri çözerken hangi yaklaşımı kullanırsın?',
        type: 'select' as const,
        options: ['Parçalara bölerim', 'Veri toplar analiz ederim', 'Benzer örnekleri araştırırım', 'Deneme yanılma']
      }
    },
    en: {
      uncertaintyAreas: {
        id: 'uncertaintyAreas',
        question: 'In which areas does this uncertainty/anxiety show itself the most?',
        type: 'multiselect' as const,
        options: ['Career choice', 'Financial security', 'Family expectations', 'Not knowing my talents', 'Fear of failure']
      },
      riskTolerance: {
        id: 'riskTolerance',
        question: 'How do you describe yourself when it comes to taking risks?',
        type: 'select' as const,
        options: ['I can take very risky steps', 'I take calculated risks', 'I prefer safe paths', 'I avoid taking risks']
      },
      financialFlexibility: {
        id: 'financialFlexibility',
        question: 'How much flexibility does your current financial situation allow for career change?',
        type: 'select' as const,
        options: ['I can comfortably live for 12+ months', 'I can manage for 6-12 months', 'I would struggle for 3-6 months', 'I need income immediately']
      },
      transitionStrategy: {
        id: 'transitionStrategy',
        question: 'Which transition strategy would you prefer without risking income loss?',
        type: 'select' as const,
        options: ['Start as side project and gradually transition', '6-month guaranteed salary sabbatical', 'Immediate full transition', 'I don\'t want to take any risks']
      },
      entrepreneurship: {
        id: 'entrepreneurship',
        question: 'What do you think about starting your own business?',
        type: 'select' as const,
        options: ['I really want to but don\'t know how', 'I\'m researching', 'I\'ve never thought about it', 'I don\'t want to']
      },
      jobSearchChallenges: {
        id: 'jobSearchChallenges',
        question: 'What challenges you the most in the job search process?',
        type: 'textarea' as const,
        validation: { minLength: 10, maxLength: 300 }
      },
      learningPriorities: {
        id: 'learningPriorities',
        question: 'What do you most want to learn in your first job/project?',
        type: 'select' as const,
        options: ['Technical skills', 'Industry knowledge', 'Working with people', 'Project management', 'Sales/marketing']
      },
      currentJobDisappointment: {
        id: 'currentJobDisappointment',
        question: 'What is your biggest disappointment in your current job?',
        type: 'textarea' as const,
        validation: { minLength: 10, maxLength: 300 }
      },
      idealWorkEnvironment: {
        id: 'idealWorkEnvironment',
        question: 'What would your ideal work environment be like?',
        type: 'select' as const,
        options: ['Remote', 'Office', 'Hybrid', 'Startup', 'Corporate', 'Freelance', 'My own business']
      },
      creativeProcess: {
        id: 'creativeProcess',
        question: 'Which process in your creative projects excites you the most?',
        type: 'select' as const,
        options: ['Finding ideas', 'Designing/planning', 'Implementation', 'Presenting to people', 'Getting feedback']
      },
      problemSolving: {
        id: 'problemSolving',
        question: 'What approach do you use when solving complex problems?',
        type: 'select' as const,
        options: ['Break into parts', 'Collect data and analyze', 'Research similar examples', 'Trial and error']
      }
    }
  };

  const langQuestions = questions[language];

  // Branch 1: Mood-based
  if (answers.mood === "Kararsız" || answers.mood === "Kaygılı" || 
      answers.mood === "Indecisive" || answers.mood === "Anxious") {
    additional.push(langQuestions.uncertaintyAreas);
    additional.push(langQuestions.riskTolerance);
  }
  
  // Branch 2: Motivation-based
  if (answers.motivation === "Para/Güvenlik" || answers.motivation === "Money/Security") {
    additional.push(langQuestions.financialFlexibility);
    additional.push(langQuestions.transitionStrategy);
  }
  
  if (answers.motivation === "Özgürlük" || answers.motivation === "Yaratıcılık" ||
      answers.motivation === "Freedom" || answers.motivation === "Creativity") {
    additional.push(langQuestions.entrepreneurship);
  }
  
  // Branch 3: Situation-based
  if (answers.currentSituation.toLowerCase().includes('işsiz') || 
      answers.currentSituation.toLowerCase().includes('mezun') ||
      answers.currentSituation.toLowerCase().includes('unemployed') ||
      answers.currentSituation.toLowerCase().includes('graduate')) {
    additional.push(langQuestions.jobSearchChallenges);
    additional.push(langQuestions.learningPriorities);
  }
  
  if (answers.currentSituation.toLowerCase().includes('çalış') || 
      answers.currentSituation.toLowerCase().includes('iş') ||
      answers.currentSituation.toLowerCase().includes('work') ||
      answers.currentSituation.toLowerCase().includes('job')) {
    additional.push(langQuestions.currentJobDisappointment);
    additional.push(langQuestions.idealWorkEnvironment);
  }
  
  // Branch 4: Work style based
  if (answers.workStyle === "Yaratıcı/Sezgisel" || answers.workStyle === "Creative/Intuitive") {
    additional.push(langQuestions.creativeProcess);
  }
  
  if (answers.workStyle === "Sistematik/Analitik" || answers.workStyle === "Systematic/Analytical") {
    additional.push(langQuestions.problemSolving);
  }
  
  return additional.slice(0, 7); // Max 7 additional questions
};
