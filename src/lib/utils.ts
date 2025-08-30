import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount / 100);
}

export function generateAccessToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export function getTokenExpiryDate(): Date {
  const now = new Date();
  now.setHours(now.getHours() + 72); // 3 days expiry
  return now;
}

export function detectLanguageFromCurrency(currency: string): 'tr' | 'en' {
  return currency === 'TRY' ? 'tr' : 'en';
}

export function detectCurrencyFromLocation(): { currency: string; language: 'tr' | 'en' } {
  // Simple detection - in production, use proper geolocation
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isTurkey = timezone.includes('Istanbul') || timezone.includes('Turkey');
  
  return {
    currency: isTurkey ? 'TRY' : 'USD',
    language: isTurkey ? 'tr' : 'en'
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
