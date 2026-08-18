import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { icon: 28, text: 'text-base', sub: 'text-[9px]' };
      case 'lg':
        return { icon: 44, text: 'text-2xl', sub: 'text-xs' };
      case 'xl':
        return { icon: 60, text: 'text-3xl sm:text-4xl', sub: 'text-xs sm:text-sm' };
      case 'md':
      default:
        return { icon: 34, text: 'text-lg sm:text-xl', sub: 'text-[10px]' };
    }
  };

  const dim = getDimensions();

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon SVG Matching the uploaded image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={dim.icon}
          height={dim.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Shopping Cart Body in Deep Blue */}
          <path
            d="M20 28H28L38 68H76L86 38H33"
            stroke="#1e3a8a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cart Grid Bars */}
          <path
            d="M42 42V56M54 40V58M66 42V58M78 40V52"
            stroke="#3b82f6"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          {/* Cart Wheels */}
          <circle cx="42" cy="78" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="72" cy="78" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Electric Cyan Growth Trend Arrow emerging from the cart */}
          <path
            d="M32 52L46 36L58 48L80 18"
            stroke="url(#pulseGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrow Head */}
          <path
            d="M66 16H84V34L80 18L66 16Z"
            fill="url(#pulseGradient)"
            stroke="#0284c7"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Highlight Line */}
          <path
            d="M34 50L46 38L58 48L78 22"
            stroke="#e0f2fe"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="pulseGradient" x1="30" y1="55" x2="85" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" />
              <stop offset="0.5" stopColor="#06b6d4" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight flex items-center leading-none ${dim.text}`}>
          <span className="text-white">Shop</span>
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Pulse
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-semibold tracking-[0.2em] text-slate-400 uppercase mt-0.5 leading-none ${dim.sub}`}
            dir="ltr"
          >
            E-COMMERCE SOLUTIONS
          </span>
        )}
      </div>
    </div>
  );
};
