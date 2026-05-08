// ============================================================================
// AdminServices — list, create, edit, delete, reorder services
// ============================================================================

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Save, X } from 'lucide-react';
import {
  adminListAll,
  adminUpsert,
  adminDelete,
  adminReorder,
  type Service,
} from '../../lib/cms';
import BilingualInput from './BilingualInput';
import BilingualListInput from './BilingualListInput';
import ImageUploader from './ImageUploader';

const ICON_OPTIONS = [
  'Wrench', 'Droplet', 'Battery', 'Settings', 'Wind', 'Disc',
  'Car', 'Lightbulb', 'Zap', 'Shield', 'Truck',
];

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await adminListAll<Service>('services'));
      setError(null);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function blank(): Service {
    return {
      id: 0, sort_order: items.length + 1, visible: true,
      title_en: '', title_ar: '', icon_name: 'Wrench',
      features_en: [], features_ar: [],
      image_url: null, rating: 4.8, reviews_count: 0,
    };
  }

  async function save(item: Service) {
    setSaving(true); setError(null);
    try {
      const payload = { ...item };
      if (!payload.id) (payload as any).id = undefined;
      await adminUpsert('services', payload as any);
      setEditing(null);
      await load();
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  }

  async function remove(id: number) {
    if (!confirm('Delete this service?')) return;
    try { await adminDelete('services', id); await load(); }
    catch (e: any) { setError(e.message); }
  }

  async function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const r = [...items];
    [r[idx], r[j]] = [r[j], r[idx]];
    setItems(r);
    try { await adminReorder('services', r.map((x) => x.id)); }
    catch (e: any) { setError(e.message); load(); }
  }

  async function toggle(s: Service) {
    try { await adminUpsert('services', { ...s, visible: !s.visible }); await load(); }
    catch (e: any) { setError(e.message); }
  }

  if (editing) return (
    <ServiceEditForm
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
          <h2 className="text-2xl font-bold text-gray-900">Services</h2>
          <p className="text-sm text-gray-600">Manage all services shown on the Services page.</p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-4 h-4" /> New service
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="text-gray-500 py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500 py-12 text-center border-2 border-dashed rounded">
          No services yet. Click "New service" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 w-12">#</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-24">Rating</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-20">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-44 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s, idx) => (
                <tr key={s.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {s.image_url && <img src={s.image_url} alt="" className="w-12 h-12 object-cover rounded" />}
                      <div>
                        <div className="font-semibold text-gray-900">{s.title_en || '—'}</div>
                        <div className="text-gray-500 text-xs" dir="rtl">{s.title_ar || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">★ {s.rating} ({s.reviews_count})</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(s)}
                      className={`text-xs px-2 py-1 rounded font-semibold flex items-center gap-1 ${s.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                    >
                      {s.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {s.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                      <button onClick={() => setEditing(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => remove(s.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
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

function ServiceEditForm({ item, onCancel, onSave, saving, error }: {
  item: Service;
  onCancel: () => void;
  onSave: (s: Service) => void;
  saving: boolean;
  error: string | null;
}) {
  const [draft, setDraft] = useState<Service>(item);
  const update = (patch: Partial<Service>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 mb-1">← Back to services</button>
          <h2 className="text-2xl font-bold text-gray-900">{draft.id ? 'Edit service' : 'New service'}</h2>
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

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
          <select
            value={draft.icon_name}
            onChange={(e) => update({ icon_name: e.target.value })}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-red-500 text-sm"
          >
            {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <BilingualListInput
          label="Features"
          itemsEn={draft.features_en}
          itemsAr={draft.features_ar}
          onChange={(en, ar) => update({ features_en: en, features_ar: ar })}
        />

        <ImageUploader
          label="Service image"
          value={draft.image_url}
          onChange={(url) => update({ image_url: url })}
          folder="services"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <input
              type="number" step="0.1" min="0" max="5"
              value={draft.rating ?? ''}
              onChange={(e) => update({ rating: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reviews count</label>
            <input
              type="number" min="0"
              value={draft.reviews_count ?? 0}
              onChange={(e) => update({ reviews_count: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
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
