export interface User {
  id: string;
  email: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  packageType: PackageType;
  amount: number;
  currency: string;
  stripeSessionId?: string;
  stripePaymentId?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSubmission {
  id: string;
  orderId: string;
  answers: Record<string, any>;
  aiAnalysis?: string;
  pdfPath?: string;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormAccessToken {
  id: string;
  orderId: string;
  token: string;
  expiresAt: Date;
  usedAt?: Date;
  status: TokenStatus;
  createdAt: Date;
}

export type PackageType = 'basic' | 'premium' | 'pro';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type SubmissionStatus = 'submitted' | 'processing' | 'completed' | 'failed';
export type TokenStatus = 'active' | 'used' | 'expired';
export type Language = 'tr' | 'en';

export interface Package {
  id: PackageType;
  name: string;
  price: { tr: number; en: number };
  currency: { tr: string; en: string };
  popular?: boolean;
  features: string[];
}
