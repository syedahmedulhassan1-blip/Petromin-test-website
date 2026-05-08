// ============================================================================
// BilingualInput
// ----------------------------------------------------------------------------
// Side-by-side English + Arabic text input. Renders Arabic field with dir=rtl
// so admins see exactly how it will display.
// ============================================================================

interface BilingualInputProps {
  label: string;
  valueEn: string;
  valueAr: string;
  onChangeEn: (value: string) => void;
  onChangeAr: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
  placeholderEn?: string;
  placeholderAr?: string;
  rows?: number;
}

export default function BilingualInput({
  label,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  multiline = false,
  required = false,
  placeholderEn = '',
  placeholderAr = '',
  rows = 3,
}: BilingualInputProps) {
  const baseClass =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm';

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* English */}
        <div>
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <span className="inline-block w-5 h-3 rounded bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
              EN
            </span>
            English
          </div>
          {multiline ? (
            <textarea
              dir="ltr"
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              required={required}
              placeholder={placeholderEn}
              rows={rows}
              className={baseClass}
            />
          ) : (
            <input
              type="text"
              dir="ltr"
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              required={required}
              placeholder={placeholderEn}
              className={baseClass}
            />
          )}
        </div>

        {/* Arabic */}
        <div>
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <span className="inline-block w-5 h-3 rounded bg-green-100 text-green-700 font-bold text-[10px] flex items-center justify-center">
              AR
            </span>
            العربية
          </div>
          {multiline ? (
            <textarea
              dir="rtl"
              lang="ar"
              value={valueAr}
              onChange={(e) => onChangeAr(e.target.value)}
              required={required}
              placeholder={placeholderAr}
              rows={rows}
              className={baseClass}
              style={{ fontFamily: 'inherit' }}
            />
          ) : (
            <input
              type="text"
              dir="rtl"
              lang="ar"
              value={valueAr}
              onChange={(e) => onChangeAr(e.target.value)}
              required={required}
              placeholder={placeholderAr}
              className={baseClass}
              style={{ fontFamily: 'inherit' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
