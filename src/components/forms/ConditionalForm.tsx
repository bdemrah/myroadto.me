'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BaseQuestions } from './BaseQuestions';
import { ConditionalQuestions } from './ConditionalQuestions';
import { BASE_QUESTIONS, getConditionalQuestions } from '@/constants/questions';
import { translations } from '@/constants/translations';
import { baseAnswersSchema, conditionalAnswersSchema } from '@/lib/validations';
import { BaseAnswers, ConditionalAnswers, FormData } from '@/types/form';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface ConditionalFormProps {
  language: 'tr' | 'en';
  onSubmit: (data: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const ConditionalForm: React.FC<ConditionalFormProps> = ({
  language,
  onSubmit,
  isSubmitting = false
}) => {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(1);
  const [baseAnswers, setBaseAnswers] = useState<BaseAnswers | null>(null);
  const [conditionalQuestions, setConditionalQuestions] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const baseForm = useForm<BaseAnswers>({
    resolver: zodResolver(baseAnswersSchema),
    mode: 'onBlur'
  });

  const conditionalForm = useForm<ConditionalAnswers>({
    resolver: zodResolver(conditionalAnswersSchema),
    mode: 'onBlur'
  });

  // Calculate total steps
  const totalSteps = baseAnswers ? 2 : 1;

  useEffect(() => {
    if (baseAnswers) {
      const additional = getConditionalQuestions(baseAnswers, language);
      setConditionalQuestions(additional);
    }
  }, [baseAnswers, language]);

  const handleBaseSubmit = (data: BaseAnswers) => {
    setBaseAnswers(data);
    setCurrentStep(2);
  };

  const handleConditionalSubmit = async (data: ConditionalAnswers) => {
    if (!baseAnswers) return;

    const formData: FormData = {
      language,
      baseAnswers,
      conditionalAnswers: data,
      currentIncome: baseAnswers.currentIncome
    };

    try {
      await onSubmit(formData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const goBack = () => {
    setCurrentStep(1);
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t.form.success}
        </h2>
        <p className="text-gray-600 mb-8">
          {t.form.successMessage}
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            {language === 'tr' 
              ? 'E-posta kutunu kontrol etmeyi unutma. Spam klasörüne de bakabilirsin.'
              : 'Don\'t forget to check your email inbox. You can also check your spam folder.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.form.title}
        </h1>
        <p className="text-gray-600 mb-6">
          {t.form.subtitle}
        </p>
        
        {/* Progress */}
        <ProgressBar 
          current={currentStep} 
          total={totalSteps} 
          className="max-w-md mx-auto"
        />
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'tr' ? 'Temel Sorular' : 'Basic Questions'}
              </h2>
              <p className="text-gray-600">
                {language === 'tr' 
                  ? 'Bu sorular senin genel durumunu anlamak için. Lütfen samimi ol.'
                  : 'These questions are to understand your general situation. Please be honest.'
                }
              </p>
            </div>

            <form onSubmit={baseForm.handleSubmit(handleBaseSubmit)} className="space-y-6">
              <BaseQuestions 
                form={baseForm}
                questions={BASE_QUESTIONS[language]}
                language={language}
              />
              
              <div className="flex justify-end pt-6 border-t">
                <Button 
                  type="submit"
                  size="lg"
                  className="min-w-32"
                  disabled={!baseForm.formState.isValid}
                >
                  {t.form.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && conditionalQuestions.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'tr' ? 'Ek Sorular' : 'Additional Questions'}
              </h2>
              <p className="text-gray-600">
                {language === 'tr' 
                  ? `Cevaplarına göre ${conditionalQuestions.length} ek soru hazırladık.`
                  : `We prepared ${conditionalQuestions.length} additional questions based on your answers.`
                }
              </p>
            </div>

            <form onSubmit={conditionalForm.handleSubmit(handleConditionalSubmit)} className="space-y-6">
              <ConditionalQuestions 
                form={conditionalForm}
                questions={conditionalQuestions}
                language={language}
              />
              
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={goBack}
                  className="min-w-32"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.form.previous}
                </Button>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="min-w-32"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>{t.form.submitting}</span>
                    </div>
                  ) : (
                    t.form.submit
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && conditionalQuestions.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'tr' ? 'Form Tamamlandı!' : 'Form Completed!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'tr' 
                ? 'Cevapların analiz ediliyor ve rapor hazırlanıyor.'
                : 'Your answers are being analyzed and the report is being prepared.'
              }
            </p>
            <Button 
              onClick={() => handleConditionalSubmit({})}
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
            </Button>
          </div>
        )}
      </div>

      {/* Help text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        {language === 'tr' 
          ? 'Sorun yaşıyorsan destek@myroadto.me adresine yazabilirsin'
          : 'If you have any issues, you can write to support@myroadto.me'
        }
      </div>
    </div>
  );
};
