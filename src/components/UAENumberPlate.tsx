interface UAENumberPlateProps {
  emirate: string;
  plateCode: string;
  plateNumber: string;
  size?: 'small' | 'medium' | 'large';
}

const emirateColors: Record<string, { bg: string; text: string }> = {
  'Dubai': { bg: 'bg-white', text: 'text-black' },
  'Abu Dhabi': { bg: 'bg-white', text: 'text-black' },
  'Sharjah': { bg: 'bg-white', text: 'text-black' },
  'Ajman': { bg: 'bg-white', text: 'text-black' },
  'Umm Al Quwain': { bg: 'bg-white', text: 'text-black' },
  'Ras Al Khaimah': { bg: 'bg-white', text: 'text-black' },
  'Fujairah': { bg: 'bg-white', text: 'text-black' },
};

const sizeClasses = {
  small: {
    container: 'w-64 h-16',
    text: 'text-xs',
    numberSize: 'text-2xl',
    codeSize: 'text-lg',
  },
  medium: {
    container: 'w-80 h-20',
    text: 'text-sm',
    numberSize: 'text-3xl',
    codeSize: 'text-xl',
  },
  large: {
    container: 'w-96 h-24',
    text: 'text-base',
    numberSize: 'text-4xl',
    codeSize: 'text-2xl',
  },
};

export default function UAENumberPlate({
  emirate,
  plateCode,
  plateNumber,
  size = 'medium'
}: UAENumberPlateProps) {
  const colors = emirateColors[emirate] || emirateColors['Dubai'];
  const sizes = sizeClasses[size];

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`
          ${sizes.container}
          ${colors.bg}
          border-4 border-black
          rounded-lg
          shadow-2xl
          overflow-hidden
          relative
          transform transition-transform hover:scale-105
        `}
        style={{
          boxShadow: '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.8)',
        }}
      >
        <div className="absolute inset-0 flex">
          <div className="flex-1 flex flex-col items-center justify-center border-r-2 border-black px-2">
            <div className={`${sizes.text} font-semibold uppercase tracking-wider ${colors.text}`}>
              {emirate}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-4 h-3 bg-red-600 rounded-sm"></div>
              <div className="w-4 h-3 bg-green-600 rounded-sm"></div>
              <div className="w-4 h-3 bg-black rounded-sm"></div>
            </div>
          </div>

          <div className="flex-[3] flex items-center justify-center gap-2 px-4">
            <div className={`
              ${sizes.numberSize}
              font-black
              ${colors.text}
              tracking-wider
              tabular-nums
            `}>
              {plateNumber}
            </div>

            <div className={`
              ${sizes.codeSize}
              font-bold
              ${colors.text}
              uppercase
              bg-gray-100
              px-3 py-1
              rounded
              border border-gray-300
            `}>
              {plateCode}
            </div>
          </div>

          <div className="absolute bottom-1 right-2">
            <div className={`${sizes.text} text-gray-500 font-semibold`}>
              🇦🇪
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)'
          }}
        />
      </div>
    </div>
  );
}