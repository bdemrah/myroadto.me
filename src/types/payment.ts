export interface PaymentSession {
  sessionId: string;
  url: string;
}

export interface PaymentSuccessData {
  sessionId: string;
  orderId: string;
  accessToken: string;
  packageType: string;
  amount: number;
  currency: string;
}

export interface StripeSessionData {
  packageType: string;
  language: string;
  email?: string;
  userId?: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
}
