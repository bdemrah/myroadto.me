import { NextRequest, NextResponse } from 'next/server';
import { analyzeCareerWithClaude } from '@/lib/claude';
import { formDataSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData } = body;

    // Validate form data
    const validationResult = formDataSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Generate analysis with Claude
    const analysis = await analyzeCareerWithClaude(validatedData);

    return NextResponse.json({
      success: true,
      analysis,
      message: 'Analysis generated successfully'
    });

  } catch (error) {
    console.error('Claude analysis error:', error);
    
    // Check if it's an API error
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI service configuration error' },
          { status: 503 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable due to high demand' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate career analysis' },
      { status: 500 }
    );
  }
}

// Test endpoint for development
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const test = searchParams.get('test');

    if (!test) {
      return NextResponse.json(
        { error: 'Add ?test=true to test the Claude API connection' },
        { status: 400 }
      );
    }

    // Test data for development
    const testFormData = {
      language: 'tr' as const,
      currentIncome: '15000 TL',
      baseAnswers: {
        currentSituation: 'Yazılım geliştirici olarak çalışıyorum ama kendi şirketimi kurmak istiyorum',
        currentIncome: '15000 TL',
        stressorsAndExciters: 'Rutin işler beni yoruyor, yeni teknolojiler öğrenmek heyecanlandırıyor',
        futureGoalsAndObstacles: 'Kendi teknoloji şirketimi kurmak istiyorum, sermaye eksikliği en büyük engel',
        naturalTalents: 'Programlama, problem çözme ve takım liderliği konularında iyiyim',
        mood: 'Heyecanlı' as const,
        motivation: 'Özgürlük' as const,
        workStyle: 'Yaratıcı/Sezgisel' as const,
        decisionMaking: 'İkisini dengelerim' as const
      },
      conditionalAnswers: {
        entrepreneurship: 'Çok istiyorum ama nasıl bilmiyorum',
        creativeProcess: 'Fikir bulma'
      }
    };

    const analysis = await analyzeCareerWithClaude(testFormData);

    return NextResponse.json({
      success: true,
      analysis,
      message: 'Test analysis generated successfully'
    });

  } catch (error) {
    console.error('Claude test error:', error);
    return NextResponse.json(
      { error: 'Claude API test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
