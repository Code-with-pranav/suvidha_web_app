
import { InputHTMLAttributes } from 'react';

interface TouchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function TouchInput({ label, error, className = '', ...props }: TouchInputProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-xl font-semibold text-gray-700">{label}</label>
            <input
                className={`
          w-full px-6 py-4 text-2xl rounded-xl border-2 transition-colors
          focus:outline-none focus:ring-4 focus:ring-primary/20
          placeholder:text-gray-300
          ${error
                        ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-500'
                        : 'border-gray-300 focus:border-primary text-gray-900'
                    }
        `}
                autoComplete="off"
                {...props}
            />
            {error && <p className="text-red-500 text-lg font-medium">{error}</p>}
        </div>
    );
}
