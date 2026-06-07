import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  resize?: 'none' | 'y' | 'x' | 'both';
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, resize = 'y', className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const resizeClasses = {
      none: 'resize-none',
      y: 'resize-y',
      x: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`
            w-full bg-slate-900/50 backdrop-blur-sm border rounded-lg px-4 py-2.5 text-white placeholder-slate-500
            transition-all duration-300 outline-none
            ${resizeClasses[resize]}
            ${error 
              ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
              : 'border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 hover:border-slate-600'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1 animate-slideUp">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
