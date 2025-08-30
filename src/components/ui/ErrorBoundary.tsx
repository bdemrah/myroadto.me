'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You could send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendErrorToService(error, errorInfo);
    }
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Bir Hata Oluştu
              </h1>
              
              <p className="text-gray-600 mb-6">
                Üzgünüz, beklenmeyen bir hata oluştu. Sayfayı yenilemeyi deneyebilir veya ana sayfaya dönebilirsiniz.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-red-800 text-sm font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={this.handleRefresh}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-brand text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sayfayı Yenile
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ana Sayfaya Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simple error fallback component
export const SimpleErrorFallback: React.FC<{ error?: Error; retry?: () => void }> = ({ 
  error, 
  retry 
}) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
    <div className="flex items-center mb-2">
      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
      <h3 className="text-red-800 font-medium">Hata Oluştu</h3>
    </div>
    <p className="text-red-600 text-sm mb-3">
      {error?.message || 'Beklenmeyen bir hata oluştu.'}
    </p>
    {retry && (
      <button
        onClick={retry}
        className="text-red-600 text-sm font-medium hover:underline"
      >
        Tekrar Dene
      </button>
    )}
  </div>
);
