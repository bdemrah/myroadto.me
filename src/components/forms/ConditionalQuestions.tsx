'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { FormQuestion } from '@/types/form';
import { ConditionalAnswers } from '@/types/form';
import { Check } from 'lucide-react';

interface ConditionalQuestionsProps {
  form: UseFormReturn<ConditionalAnswers>;
  questions: FormQuestion[];
  language: 'tr' | 'en';
}

export const ConditionalQuestions: React.FC<ConditionalQuestionsProps> = ({
  form,
  questions,
  language
}) => {
  const { register, setValue, watch, formState: { errors } } = form;

  const renderField = (question: FormQuestion) => {
    const fieldName = question.id as keyof ConditionalAnswers;
    const error = errors[fieldName];

    switch (question.type) {
      case 'text':
        return (
          <Input
            {...register(fieldName)}
            placeholder={language === 'tr' ? 'Yanıtınızı yazın...' : 'Write your answer...'}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...register(fieldName)}
            rows={3}
            placeholder={language === 'tr' ? 'Detaylı yanıtınızı yazın...' : 'Write your detailed answer...'}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'select':
        return (
          <Select
            value={watch(fieldName) as string || ''}
            onValueChange={(value) => setValue(fieldName, value as any)}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={language === 'tr' ? 'Seçiniz...' : 'Select...'} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        const selectedValues = (watch(fieldName) as string[]) || [];
        
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => {
              const isSelected = selectedValues.includes(option);
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const current = selectedValues;
                    const updated = isSelected 
                      ? current.filter(v => v !== option)
                      : [...current, option];
                    setValue(fieldName, updated as any);
                  }}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl text-left transition-all duration-300 font-medium ${
                    isSelected 
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-md' 
                      : 'border-gray-200 hover:border-brand-blue/50 hover:shadow-md'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </button>
              );
            })}
            <p className="text-xs text-gray-500 mt-2">
              {language === 'tr' ? 'Birden fazla seçenek seçebilirsin' : 'You can select multiple options'}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="space-y-2">
          {/* Question number and text */}
          <label className="block text-base font-semibold text-gray-900 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-brand-pink to-brand-orange text-white text-sm font-bold rounded-full mr-4">
              {index + 10}
            </span>
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {/* Form field */}
          {renderField(question)}

          {/* Validation message */}
          {errors[question.id as keyof ConditionalAnswers] && (
            <p className="text-sm text-red-600 mt-1">
              {errors[question.id as keyof ConditionalAnswers]?.message}
            </p>
          )}

          {/* Character count for textarea */}
          {question.type === 'textarea' && question.validation?.maxLength && (
            <p className="text-xs text-gray-500 text-right">
              {(watch(question.id as keyof ConditionalAnswers) as string)?.length || 0} / {question.validation.maxLength}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
