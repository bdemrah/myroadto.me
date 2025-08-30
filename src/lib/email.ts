import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendFormAccessEmail = async (
  email: string, 
  token: string, 
  language: string,
  packageType: string
): Promise<void> => {
  const isturkish = language === 'tr';
  const formUrl = `${process.env.APP_URL}/form/${token}`;
  
  const subject = isturkish 
    ? 'Form Erişim Linkin Hazır! ✨' 
    : 'Your Form Access Link is Ready! ✨';
    
  const html = generateFormAccessTemplate(formUrl, language, packageType);
  
  await resend.emails.send({
    from: 'MyRoadTo.me <noreply@myroadto.me>',
    to: [email],
    subject,
    html,
  });
};

export const sendPDFDeliveryEmail = async (
  email: string,
  pdfPath: string,
  language: string,
  packageType: string
): Promise<void> => {
  const isturkish = language === 'tr';
  
  const subject = isturkish 
    ? 'Kariyer Raporun Hazır! 🎯' 
    : 'Your Career Report is Ready! 🎯';
    
  const html = generatePDFDeliveryTemplate(pdfPath, language, packageType);
  
  await resend.emails.send({
    from: 'MyRoadTo.me <noreply@myroadto.me>',
    to: [email],
    subject,
    html,
    attachments: [{
      filename: `MyRoadTo.me-Career-Report-${packageType}.pdf`,
      path: pdfPath,
    }],
  });
};

const generateFormAccessTemplate = (formUrl: string, language: string, packageType: string): string => {
  const isturkish = language === 'tr';
  
  if (isturkish) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Form Erişim Linkin</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MyRoadTo.me</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Kariyerinde Yeni Başlangıçlar</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #1a202c; margin-bottom: 20px;">Merhaba! 👋</h2>
            
            <p>Ödemen başarıyla tamamlandı ve <strong>${packageType.toUpperCase()}</strong> paketini aldın!</p>
            
            <p>Şimdi kariyer analizi formunu doldurma zamanı. Bu form yaklaşık 5-10 dakika sürecek ve senin için özel olarak hazırlanmış sorular içeriyor.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${formUrl}" style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Formu Doldur</a>
            </div>
            
            <p><strong>Önemli:</strong> Bu link 72 saat boyunca geçerli. Formu doldurduktan sonra raporun 24 saat içinde hazır olacak.</p>
            
            <p>Herhangi bir sorun yaşarsan bize ulaşabilirsin: <a href="mailto:destek@myroadto.me">destek@myroadto.me</a></p>
        </div>
        
        <div style="text-align: center; color: #666; font-size: 14px;">
            <p>© 2024 MyRoadTo.me. Tüm hakları saklıdır.</p>
        </div>
    </body>
    </html>
    `;
  } else {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Your Form Access Link</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">MyRoadTo.me</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">New Beginnings in Your Career</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #1a202c; margin-bottom: 20px;">Hello! 👋</h2>
            
            <p>Your payment was successful and you've purchased the <strong>${packageType.toUpperCase()}</strong> package!</p>
            
            <p>Now it's time to fill out the career analysis form. This form will take approximately 5-10 minutes and contains questions specially prepared for you.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${formUrl}" style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Fill Out Form</a>
            </div>
            
            <p><strong>Important:</strong> This link is valid for 72 hours. After filling out the form, your report will be ready within 24 hours.</p>
            
            <p>If you have any problems, you can contact us: <a href="mailto:support@myroadto.me">support@myroadto.me</a></p>
        </div>
        
        <div style="text-align: center; color: #666; font-size: 14px;">
            <p>© 2024 MyRoadTo.me. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
  }
};

const generatePDFDeliveryTemplate = (pdfUrl: string, language: string, packageType: string): string => {
  const isturkish = language === 'tr';
  
  if (isturkish) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Kariyer Raporun Hazır!</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎯 Raporun Hazır!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Kariyerinde Yeni Dönem Başlıyor</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #1a202c; margin-bottom: 20px;">Tebrikler! 🎉</h2>
            
            <p>Senin için özel olarak hazırladığımız <strong>${packageType.toUpperCase()}</strong> kariyer analizi raporu hazır!</p>
            
            <p>Bu raporda bulacakların:</p>
            <ul>
                <li>✨ Kişisel profil analizin</li>
                <li>🛤️ 3 farklı kariyer rotası</li>
                <li>📋 Her rota için detaylı eylem planları</li>
                <li>🎯 İlk 7 gün için adım adım rehber</li>
                <li>🚀 90 günlük büyük resim vizyonu</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${pdfUrl}" style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Raporu İndir</a>
            </div>
            
            <p><strong>İpucu:</strong> Raporu indirdikten sonra yazdır ve önemli kısımları işaretle. Bu senin kariyer dönüşüm rehberin!</p>
            
            <p>Başarılar! Artık hangi yolda ilerleyeceğini biliyorsun. 💪</p>
        </div>
        
        <div style="text-align: center; color: #666; font-size: 14px;">
            <p>© 2024 MyRoadTo.me. Kariyerinde yeni başlangıçlar.</p>
        </div>
    </body>
    </html>
    `;
  } else {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Your Career Report is Ready!</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎯 Your Report is Ready!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">A New Era Begins in Your Career</p>
        </div>
        
        <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #1a202c; margin-bottom: 20px;">Congratulations! 🎉</h2>
            
            <p>Your <strong>${packageType.toUpperCase()}</strong> career analysis report, specially prepared for you, is ready!</p>
            
            <p>What you'll find in this report:</p>
            <ul>
                <li>✨ Your personal profile analysis</li>
                <li>🛤️ 3 different career routes</li>
                <li>📋 Detailed action plans for each route</li>
                <li>🎯 Step-by-step guide for the first 7 days</li>
                <li>🚀 90-day big picture vision</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${pdfUrl}" style="background: linear-gradient(135deg, #00D4FF 0%, #FF1B8D 50%, #FF6B35 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Download Report</a>
            </div>
            
            <p><strong>Tip:</strong> After downloading the report, print it out and mark the important parts. This is your career transformation guide!</p>
            
            <p>Good luck! Now you know which path to take. 💪</p>
        </div>
        
        <div style="text-align: center; color: #666; font-size: 14px;">
            <p>© 2024 MyRoadTo.me. New beginnings in your career.</p>
        </div>
    </body>
    </html>
    `;
  }
};
