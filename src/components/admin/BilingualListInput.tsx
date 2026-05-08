// ============================================================================
// BilingualListInput
// ----------------------------------------------------------------------------
// Side-by-side English + Arabic editor for a list of strings (e.g. service
// features, offer features). Add / remove rows; left side LTR, right side RTL.
// ============================================================================

import { Plus, X } from 'lucide-react';

interface BilingualListInputProps {
  label: string;
  itemsEn: string[];
  itemsAr: string[];
  onChange: (en: string[], ar: string[]) => void;
}

export default function BilingualListInput({
  label,
  itemsEn,
  itemsAr,
  onChange,
}: BilingualListInputProps) {
  const max = Math.max(itemsEn.length, itemsAr.length);
  const rows = Array.from({ length: max }, (_, i) => ({
    en: itemsEn[i] ?? '',
    ar: itemsAr[i] ?? '',
  }));

  const updateRow = (idx: number, field: 'en' | 'ar', value: string) => {
    const en = [...itemsEn];
    const ar = [...itemsAr];
    while (en.length <= idx) en.push('');
    while (ar.length <= idx) ar.push('');
    if (field === 'en') en[idx] = value;
    else ar[idx] = value;
    onChange(en, ar);
  };

  const addRow = () => {
    onChange([...itemsEn, ''], [...itemsAr, '']);
  };

  const removeRow = (idx: number) => {
    onChange(
      itemsEn.filter((_, i) => i !== idx),
      itemsAr.filter((_, i) => i !== idx)
    );
  };

  const inputClass =
    'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <button
          type="button"
          onClick={addRow}
          className="text-xs flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold"
        >
          <Plus className="w-3 h-3" /> Add item
        </button>
      </div>
      <div className="space-y-2">
        {rows.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No items yet — click "Add item"</p>
        ) : (
          rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-start">
              <input
                type="text"
                dir="ltr"
                value={row.en}
                onChange={(e) => updateRow(idx, 'en', e.target.value)}
                placeholder={`English ${idx + 1}`}
                className={inputClass}
              />
              <input
                type="text"
                dir="rtl"
                lang="ar"
                value={row.ar}
                onChange={(e) => updateRow(idx, 'ar', e.target.value)}
                placeholder={`عربي ${idx + 1}`}
                className={inputClass}
                style={{ fontFamily: 'inherit' }}
              />
              <button
                type="button"
                onClick={() => removeRow(idx)}
                className="p-1.5 text-gray-400 hover:text-red-600 transition"
                title="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
