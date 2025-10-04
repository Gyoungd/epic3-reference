import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" aria-hidden="true" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" aria-hidden="true" />;
      default:
        return <Info className="w-5 h-5" aria-hidden="true" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-300';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-300';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-300';
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 max-w-md rounded-xl border-2 shadow-lg p-4 flex items-start gap-3 animate-slide-up z-50 ${getStyles()}`}
      role="alert"
      aria-live="polite"
    >
      {getIcon()}
      <p className="flex-1 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
