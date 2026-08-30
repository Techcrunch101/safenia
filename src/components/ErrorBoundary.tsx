import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    if (
      error?.message?.includes('MetaMask') ||
      error?.message?.includes('ethereum') ||
      error?.message?.includes('chrome-extension') ||
      error?.message?.includes('moz-extension')
    ) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (
      error?.message?.includes('MetaMask') ||
      error?.message?.includes('ethereum') ||
      error?.message?.includes('chrome-extension')
    ) {
      return;
    }
    console.error('Safenia ErrorBoundary captured error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0908] text-[#F5F0E6] flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4 border border-[#D4AF37]/30 bg-[#14110E] p-8">
            <h2 className="font-serif-luxury text-2xl text-[#D4AF37]">The Sanctuary is Refreshing</h2>
            <p className="text-xs text-[#B3ACA0] font-sans-body">
              An unexpected display issue occurred. Please refresh to restore the botanical experience.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#D4AF37] text-[#0B0908] text-xs uppercase font-bold tracking-wider hover:bg-[#F3E5AB] transition-colors cursor-pointer"
            >
              Refresh Sanctuary
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
