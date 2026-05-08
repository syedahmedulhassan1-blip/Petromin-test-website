// ============================================================================
// AdminHero — manage homepage hero slides
// ============================================================================

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Save, X } from 'lucide-react';
import {
  adminListAll, adminUpsert, adminDelete, adminReorder,
  type HeroSlide,
} from '../../lib/cms';
import BilingualInput from './BilingualInput';
import ImageUploader from './ImageUploader';

export default function AdminHero() {
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try { setItems(await adminListAll<HeroSlide>('hero_slides')); setError(null); }
    catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function blank(): HeroSlide {
    return {
      id: 0, sort_order: items.length + 1, visible: true,
      title_en: '', title_ar: '',
      subtitle_en: '', subtitle_ar: '',
      cta_text_en: 'Book Now', cta_text_ar: 'احجز الآن',
      cta_link: '/services', image_url: null,
    };
  }

  async function save(item: HeroSlide) {
    setSaving(true); setError(null);
    try {
      const payload = { ...item };
      if (!payload.id) (payload as any).id = undefined;
      await adminUpsert('hero_slides', payload as any);
      setEditing(null); await load();
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  }

  async function remove(id: number) {
    if (!confirm('Delete this hero slide?')) return;
    try { await adminDelete('hero_slides', id); await load(); }
    catch (e: any) { setError(e.message); }
  }

  async function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const r = [...items];
    [r[idx], r[j]] = [r[j], r[idx]];
    setItems(r);
    try { await adminReorder('hero_slides', r.map((x) => x.id)); }
    catch (e: any) { setError(e.message); load(); }
  }

  async function toggle(h: HeroSlide) {
    try { await adminUpsert('hero_slides', { ...h, visible: !h.visible }); await load(); }
    catch (e: any) { setError(e.message); }
  }

  if (editing) return (
    <HeroEditForm
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
          <h2 className="text-2xl font-bold text-gray-900">Hero slides</h2>
          <p className="text-sm text-gray-600">The big banner carousel at the top of the homepage.</p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-4 h-4" /> New slide
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

      {loading ? (
        <div className="text-gray-500 py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500 py-12 text-center border-2 border-dashed rounded">
          No hero slides yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((h, idx) => (
            <div key={h.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {h.image_url && <img src={h.image_url} alt="" className="w-full h-40 object-cover" />}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Slide {idx + 1}</div>
                    <h3 className="font-semibold text-gray-900">{h.title_en || '—'}</h3>
                    <p className="text-xs text-gray-500" dir="rtl">{h.title_ar || '—'}</p>
                  </div>
                  <button
                    onClick={() => toggle(h)}
                    className={`text-xs px-2 py-1 rounded font-semibold flex items-center gap-1 ${h.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {h.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <button onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                  <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                  <div className="flex-1" />
                  <button onClick={() => setEditing(h)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(h.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HeroEditForm({ item, onCancel, onSave, saving, error }: {
  item: HeroSlide;
  onCancel: () => void;
  onSave: (h: HeroSlide) => void;
  saving: boolean;
  error: string | null;
}) {
  const [draft, setDraft] = useState<HeroSlide>(item);
  const update = (patch: Partial<HeroSlide>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 mb-1">← Back to slides</button>
          <h2 className="text-2xl font-bold text-gray-900">{draft.id ? 'Edit slide' : 'New slide'}</h2>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-1">
        <BilingualInput
          label="Title"
          required
          valueEn={draft.title_en}
          valueAr={draft.title_ar}
          onChangeEn={(v) => update({ title_en: v })}
          onChangeAr={(v) => update({ title_ar: v })}
        />

        <BilingualInput
          label="Subtitle"
          multiline rows={2}
          valueEn={draft.subtitle_en ?? ''}
          valueAr={draft.subtitle_ar ?? ''}
          onChangeEn={(v) => update({ subtitle_en: v })}
          onChangeAr={(v) => update({ subtitle_ar: v })}
        />

        <BilingualInput
          label="Button text (CTA)"
          valueEn={draft.cta_text_en ?? ''}
          valueAr={draft.cta_text_ar ?? ''}
          onChangeEn={(v) => update({ cta_text_en: v })}
          onChangeAr={(v) => update({ cta_text_ar: v })}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Button link (URL or path)</label>
          <input
            type="text"
            value={draft.cta_link ?? ''}
            onChange={(e) => update({ cta_link: e.target.value })}
            placeholder="/services"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <ImageUploader
          label="Background image"
          value={draft.image_url}
          onChange={(url) => update({ image_url: url })}
          folder="hero"
        />

        <label className="flex items-center gap-2 text-sm text-gray-700 pt-2">
          <input
            type="checkbox" checked={draft.visible}
            onChange={(e) => update({ visible: e.target.checked })}
            className="w-4 h-4"
          />
          Visible on website
        </label>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => onSave(draft)}
          disabled={saving || !draft.title_en || !draft.title_ar}
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
