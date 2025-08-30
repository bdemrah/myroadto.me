import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeAZ9hiA.woff2', fontWeight: 'bold' },
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 1.6,
    color: '#1a202c',
  },
  header: {
    backgroundColor: '#00D4FF',
    background: 'linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%)',
    color: 'white',
    padding: 30,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.9,
  },
  content: {
    padding: 30,
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: '2px solid #e2e8f0',
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
    marginTop: 15,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#4a5568',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#4a5568',
    marginBottom: 6,
    paddingLeft: 15,
  },
  highlight: {
    backgroundColor: '#f7fafc',
    padding: 15,
    borderRadius: 8,
    borderLeft: '4px solid #00D4FF',
    marginBottom: 15,
  },
  highlightText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  route: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    border: '1px solid #e2e8f0',
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 10,
  },
  actionPlan: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    border: '1px solid #e2e8f0',
  },
  stepNumber: {
    backgroundColor: '#00D4FF',
    color: 'white',
    borderRadius: '50%',
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footer: {
    padding: 20,
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  footerText: {
    fontSize: 9,
    color: '#718096',
  },
});

interface ReportTemplateProps {
  analysis: string;
  userInfo: {
    packageType: string;
    language: string;
    createdAt: string;
  };
}

export const ReportTemplate: React.FC<ReportTemplateProps> = ({ analysis, userInfo }) => {
  const sections = parseAnalysis(analysis);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MyRoadTo.me</Text>
          <Text style={styles.headerSubtitle}>
            {userInfo.language === 'tr' ? 'Kişisel Kariyer Analizi Raporu' : 'Personal Career Analysis Report'}
          </Text>
          <Text style={[styles.headerSubtitle, { marginTop: 10 }]}>
            {userInfo.packageType.toUpperCase()} {userInfo.language === 'tr' ? 'Paketi' : 'Package'}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Date */}
          <View style={styles.highlight}>
            <Text style={styles.highlightText}>
              {userInfo.language === 'tr' ? 'Rapor Tarihi: ' : 'Report Date: '}
              {new Date(userInfo.createdAt).toLocaleDateString(userInfo.language === 'tr' ? 'tr-TR' : 'en-US')}
            </Text>
          </View>

          {/* Personal Profile Analysis */}
          {sections.personalProfile && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {userInfo.language === 'tr' ? '1. KİŞİSEL PROFİL ANALİZİ' : '1. PERSONAL PROFILE ANALYSIS'}
              </Text>
              <Text style={styles.text}>{sections.personalProfile}</Text>
            </View>
          )}

          {/* Career Routes */}
          {sections.routes && sections.routes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {userInfo.language === 'tr' ? '2. 3 POTANSİYEL ROTANIZ' : '2. 3 POTENTIAL ROUTES'}
              </Text>
              {sections.routes.map((route, index) => (
                <View key={index} style={styles.route}>
                  <Text style={styles.routeTitle}>{route.title}</Text>
                  <Text style={styles.text}>{route.content}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Plans */}
          {sections.actionPlans && sections.actionPlans.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>
                {userInfo.language === 'tr' ? '3. EYLEM PLANLARI' : '3. ACTION PLANS'}
              </Text>
              {sections.actionPlans.map((plan, index) => (
                <View key={index} style={styles.actionPlan}>
                  <Text style={styles.subsectionTitle}>{plan.title}</Text>
                  {plan.steps.map((step, stepIndex) => (
                    <View key={stepIndex} style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <Text style={styles.listItem}>• {step}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 MyRoadTo.me - {userInfo.language === 'tr' ? 'Kariyerinde yeni başlangıçlar' : 'New beginnings in your career'}
          </Text>
          <Text style={[styles.footerText, { marginTop: 5 }]}>
            {userInfo.language === 'tr' ? 'Bu rapor kişiye özeldir ve gizlidir.' : 'This report is personal and confidential.'}
          </Text>
        </View>
      </Page>

      {/* Second page for detailed plans */}
      {(sections.detailedPlans || sections.bigPicture || sections.personalNote) && (
        <Page size="A4" style={styles.page}>
          <View style={styles.content}>
            {/* 7-Day Plans */}
            {sections.detailedPlans && sections.detailedPlans.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {userInfo.language === 'tr' ? '4. İLK 7 GÜN DETAY PLANLARI' : '4. FIRST 7 DAYS DETAIL PLANS'}
                </Text>
                {sections.detailedPlans.map((plan, index) => (
                  <View key={index} style={styles.actionPlan}>
                    <Text style={styles.subsectionTitle}>{plan.title}</Text>
                    {plan.days.map((day, dayIndex) => (
                      <Text key={dayIndex} style={styles.listItem}>• {day}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* 90-Day Vision */}
            {sections.bigPicture && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {userInfo.language === 'tr' ? '5. 90 GÜNLÜK BÜYÜK RESİM' : '5. 90-DAY BIG PICTURE'}
                </Text>
                <View style={styles.highlight}>
                  <Text style={styles.text}>{sections.bigPicture}</Text>
                </View>
              </View>
            )}

            {/* Personal Note */}
            {sections.personalNote && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {userInfo.language === 'tr' ? '6. KENDİNE GÜÇLENDİRİCİ NOT' : '6. EMPOWERING PERSONAL NOTE'}
                </Text>
                <View style={[styles.highlight, { borderLeftColor: '#FF1B8D' }]}>
                  <Text style={[styles.text, { fontWeight: 'bold', color: '#2d3748' }]}>
                    {sections.personalNote}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {userInfo.language === 'tr' 
                ? 'Başarılar! Bu sadece başlangıç. Sen yapabilirsin! 💪'
                : 'Good luck! This is just the beginning. You can do it! 💪'
              }
            </Text>
          </View>
        </Page>
      )}
    </Document>
  );
};

// Helper function to parse Claude's analysis
function parseAnalysis(analysis: string) {
  const sections: any = {};
  
  // Split by main sections
  const parts = analysis.split(/## \d+\./);
  
  parts.forEach(part => {
    if (part.includes('KİŞİSEL PROFİL') || part.includes('PERSONAL PROFILE')) {
      sections.personalProfile = part.replace(/KİŞİSEL PROFİL ANALİZİ|PERSONAL PROFILE ANALYSIS/g, '').trim();
    }
    
    if (part.includes('POTANSİYEL ROTA') || part.includes('POTENTIAL ROUTES')) {
      const routes = [];
      const routeMatches = part.match(/### (Rota|Route) \d+:.*?(?=### |$)/gs);
      routeMatches?.forEach(match => {
        const lines = match.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
          routes.push({
            title: lines[0].replace('###', '').trim(),
            content: lines.slice(1).join(' ').trim()
          });
        }
      });
      sections.routes = routes;
    }
    
    if (part.includes('EYLEM PLAN') || part.includes('ACTION PLAN')) {
      const plans = [];
      const planMatches = part.match(/### (Rota|Route) \d+.*?(?=### |$)/gs);
      planMatches?.forEach(match => {
        const lines = match.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
          plans.push({
            title: lines[0].replace('###', '').trim(),
            steps: lines.slice(1).filter(line => line.match(/^\d+\./)).map(step => step.trim())
          });
        }
      });
      sections.actionPlans = plans;
    }
    
    if (part.includes('7 GÜN') || part.includes('7 DAYS')) {
      const plans = [];
      const planMatches = part.match(/### (Rota|Route) \d+.*?(?=### |$)/gs);
      planMatches?.forEach(match => {
        const lines = match.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
          plans.push({
            title: lines[0].replace('###', '').trim(),
            days: lines.slice(1).filter(line => line.match(/- \*\*(Gün|Day) \d+/)).map(day => day.trim())
          });
        }
      });
      sections.detailedPlans = plans;
    }
    
    if (part.includes('BÜYÜK RESİM') || part.includes('BIG PICTURE')) {
      sections.bigPicture = part.replace(/90 GÜNLÜK BÜYÜK RESİM|90-DAY BIG PICTURE/g, '').trim();
    }
    
    if (part.includes('GÜÇLENDİRİCİ') || part.includes('EMPOWERING')) {
      sections.personalNote = part.replace(/KENDİNE GÜÇLENDİRİCİ NOT|EMPOWERING PERSONAL NOTE/g, '').trim();
    }
  });
  
  return sections;
}
