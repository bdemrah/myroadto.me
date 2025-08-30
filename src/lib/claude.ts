import Anthropic from '@anthropic-ai/sdk';
import { FormData } from '@/types/form';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const generateClaudePrompt = (formData: FormData): string => {
  const language = formData.language;
  const isturkish = language === 'tr';
  
  return `
You are an expert career counselor analyzing a user's responses for personalized career guidance.

CRITICAL INSTRUCTIONS:
- Respond in ${isturkish ? 'Turkish' : 'English'}
- Use income-aware analysis based on their current income: ${formData.currentIncome}
- Apply conditional high performance approach (motivational but realistic with conditions)
- Challenge user with "Do you really want this?" messaging
- Avoid excessive English terms in Turkish responses
- Include specific income projections in ${isturkish ? 'TL' : 'USD'}

USER DATA:
Current Income: ${formData.currentIncome}
Language: ${formData.language}
Base Answers: ${JSON.stringify(formData.baseAnswers)}
Additional Answers: ${JSON.stringify(formData.conditionalAnswers)}

GENERATE EXACTLY THIS STRUCTURE:

## 1. ${isturkish ? 'KİŞİSEL PROFİL ANALİZİ' : 'PERSONAL PROFILE ANALYSIS'}
[150-200 words analyzing their personality, strengths, and current situation with income context]

## 2. ${isturkish ? '3 POTANSİYEL ROTANIZ' : '3 POTENTIAL ROUTES'}

### ${isturkish ? 'Rota 1' : 'Route 1'}: [Name]
[120-150 words with conservative and ambitious income scenarios based on their current income]

### ${isturkish ? 'Rota 2' : 'Route 2'}: [Name] 
[120-150 words with conservative and ambitious income scenarios based on their current income]

### ${isturkish ? 'Rota 3' : 'Route 3'}: [Name]
[120-150 words with conservative and ambitious income scenarios based on their current income]

## 3. ${isturkish ? 'EYLEM PLANLARI' : 'ACTION PLANS'}

### ${isturkish ? 'Rota 1 - 5 Adımlık Plan' : 'Route 1 - 5-Step Plan'}:
1. **${isTurkish ? 'Ay' : 'Month'} 1-2**: [Specific actions with costs in local currency]
2. **${isturkish ? 'Ay' : 'Month'} 3-4**: [Specific actions]
3. **${isturkish ? 'Ay' : 'Month'} 5-6**: [Specific actions] 
4. **${isturkish ? 'Ay' : 'Month'} 7-9**: [Specific actions with income targets]
5. **${isturkish ? 'Ay' : 'Month'} 10-12**: [Specific actions with final targets]

### ${isturkish ? 'Rota 2 - 5 Adımlık Plan' : 'Route 2 - 5-Step Plan'}:
[Same structure for route 2]

### ${isturkish ? 'Rota 3 - 5 Adımlık Plan' : 'Route 3 - 5-Step Plan'}:
[Same structure for route 3]

## 4. ${isturkish ? 'İLK 7 GÜN DETAY PLANLARI' : 'FIRST 7 DAYS DETAIL PLANS'}

### ${isturkish ? 'Rota 1 - İlk 7 Gün' : 'Route 1 - First 7 Days'}:
- **${isturkish ? 'Gün' : 'Day'} 1**: [Specific action]
- **${isturkish ? 'Gün' : 'Day'} 2**: [Specific action]
- **${isturkish ? 'Gün' : 'Day'} 3**: [Specific action]
- **${isturkish ? 'Gün' : 'Day'} 4**: [Specific action]
- **${isturkish ? 'Gün' : 'Day'} 5**: [Specific action]
- **${isturkish ? 'Gün' : 'Day'} 6**: [Specific action]
- **${isturkish ? 'Gün' : 'Day'} 7**: [Specific action]

### ${isturkish ? 'Rota 2 - İlk 7 Gün' : 'Route 2 - First 7 Days'}:
[Same structure]

### ${isturkish ? 'Rota 3 - İlk 7 Gün' : 'Route 3 - First 7 Days'}:
[Same structure]

## 5. ${isturkish ? '90 GÜNLÜK BÜYÜK RESİM' : '90-DAY BIG PICTURE'}
[100-120 words about where they'll be in 90 days with conditional success language]

## 6. ${isturkish ? 'KENDİNE GÜÇLENDİRİCİ NOT' : 'EMPOWERING PERSONAL NOTE'}
[80-100 words with motivational challenge starting with "${isturkish ? 'Bu değişimi gerçekten istiyor musun?' : 'Do you really want this change?'}"]
`;
};

export const analyzeCareerWithClaude = async (formData: FormData): Promise<string> => {
  try {
    const prompt = generateClaudePrompt(formData);
    
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const analysis = response.content[0];
    if (analysis.type === 'text') {
      return analysis.text;
    }
    
    throw new Error('Invalid response from Claude API');
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('Failed to generate career analysis');
  }
};
