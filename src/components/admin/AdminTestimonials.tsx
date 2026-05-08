// ============================================================================
// AdminTestimonials — list, create, edit, delete, reorder testimonials
// ============================================================================

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Save, X, Star } from 'lucide-react';
import {
  adminListAll, adminUpsert, adminDelete, adminReorder,
  type Testimonial,
} from '../../lib/cms';
import BilingualInput from './BilingualInput';

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try { setItems(await adminListAll<Testimonial>('testimonials')); setError(null); }
    catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function blank(): Testimonial {
    return {
      id: 0, sort_order: items.length + 1, visible: true,
      text_en: '', text_ar: '', author_en: '', author_ar: '',
      location_en: '', location_ar: '', rating: 5,
    };
  }

  async function save(item: Testimonial) {
    setSaving(true); setError(null);
    try {
      const payload = { ...item };
      if (!payload.id) (payload as any).id = undefined;
      await adminUpsert('testimonials', payload as any);
      setEditing(null);
      await load();
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  }

  async function remove(id: number) {
    if (!confirm('Delete this testimonial?')) return;
    try { await adminDelete('testimonials', id); await load(); }
    catch (e: any) { setError(e.message); }
  }

  async function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const r = [...items];
    [r[idx], r[j]] = [r[j], r[idx]];
    setItems(r);
    try { await adminReorder('testimonials', r.map((x) => x.id)); }
    catch (e: any) { setError(e.message); load(); }
  }

  async function toggle(t: Testimonial) {
    try { await adminUpsert('testimonials', { ...t, visible: !t.visible }); await load(); }
    catch (e: any) { setError(e.message); }
  }

  if (editing) return (
    <TestimonialEditForm
      item={editing}
      onCancel={() => setEditing(null)}
      onSave={save}
      saving={saving}
      error={error}
    />
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-sm text-gray-600">Customer reviews shown on the home page.</p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-4 h-4" /> New testimonial
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

      {loading ? (
        <div className="text-gray-500 py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500 py-12 text-center border-2 border-dashed rounded">
          No testimonials yet.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 w-12">#</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Author</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Quote</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-24">Rating</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-20">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-44 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t, idx) => (
                <tr key={t.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{t.author_en || '—'}</div>
                    <div className="text-gray-500 text-xs">{t.location_en}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-md">
                    <div className="line-clamp-2 text-xs">{t.text_en}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(t)}
                      className={`text-xs px-2 py-1 rounded font-semibold flex items-center gap-1 ${t.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {t.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {t.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                      <button onClick={() => setEditing(t)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => remove(t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TestimonialEditForm({ item, onCancel, onSave, saving, error }: {
  item: Testimonial;
  onCancel: () => void;
  onSave: (t: Testimonial) => void;
  saving: boolean;
  error: string | null;
}) {
  const [draft, setDraft] = useState<Testimonial>(item);
  const update = (patch: Partial<Testimonial>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 mb-1">← Back to testimonials</button>
          <h2 className="text-2xl font-bold text-gray-900">{draft.id ? 'Edit testimonial' : 'New testimonial'}</h2>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-1">
        <BilingualInput
          label="Quote text"
          required multiline rows={4}
          valueEn={draft.text_en}
          valueAr={draft.text_ar}
          onChangeEn={(v) => update({ text_en: v })}
          onChangeAr={(v) => update({ text_ar: v })}
        />

        <BilingualInput
          label="Author"
          required
          valueEn={draft.author_en}
          valueAr={draft.author_ar}
          onChangeEn={(v) => update({ author_en: v })}
          onChangeAr={(v) => update({ author_ar: v })}
          placeholderEn="e.g. Ahmed S."
          placeholderAr="مثال: أحمد س."
        />

        <BilingualInput
          label="Location"
          valueEn={draft.location_en ?? ''}
          valueAr={draft.location_ar ?? ''}
          onChangeEn={(v) => update({ location_en: v })}
          onChangeAr={(v) => update({ location_ar: v })}
          placeholderEn="Dubai"
          placeholderAr="دبي"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <select
              value={draft.rating}
              onChange={(e) => update({ rating: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-500"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} star{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <label className="flex items-end gap-2 text-sm text-gray-700 pb-2">
            <input
              type="checkbox" checked={draft.visible}
              onChange={(e) => update({ visible: e.target.checked })}
              className="w-4 h-4"
            />
            Visible on website
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => onSave(draft)}
          disabled={saving || !draft.text_en || !draft.text_ar || !draft.author_en || !draft.author_ar}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save'}
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
}
