// ============================================================================
// AdminOffers — list, create, edit, delete, reorder offers
// ============================================================================

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Save, X } from 'lucide-react';
import {
  adminListAll,
  adminUpsert,
  adminDelete,
  adminReorder,
  type Offer,
} from '../../lib/cms';
import BilingualInput from './BilingualInput';
import BilingualListInput from './BilingualListInput';
import ImageUploader from './ImageUploader';

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminListAll<Offer>('offers');
      setOffers(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function newOffer(): Offer {
    return {
      id: 0,
      sort_order: offers.length + 1,
      visible: true,
      title_en: '',
      title_ar: '',
      subtitle_en: '',
      subtitle_ar: '',
      price_en: '',
      price_ar: '',
      discount_en: '',
      discount_ar: '',
      features_en: [],
      features_ar: [],
      image_url: null,
      popular: false,
      popular_label_en: 'MOST POPULAR',
      popular_label_ar: 'الأكثر شعبية',
      whatsapp_message: '',
    };
  }

  async function handleSave(offer: Offer) {
    setSaving(true);
    setError(null);
    try {
      const payload = { ...offer };
      if (!payload.id) (payload as any).id = undefined;
      await adminUpsert('offers', payload as any);
      setEditing(null);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this offer? This cannot be undone.')) return;
    try {
      await adminDelete('offers', id);
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function handleMove(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= offers.length) return;
    const reordered = [...offers];
    [reordered[idx], reordered[newIdx]] = [reordered[newIdx], reordered[idx]];
    setOffers(reordered);
    try {
      await adminReorder('offers', reordered.map((o) => o.id));
    } catch (e: any) {
      setError(e.message);
      load();
    }
  }

  async function toggleVisible(o: Offer) {
    try {
      await adminUpsert('offers', { ...o, visible: !o.visible });
      await load();
    } catch (e: any) {
      setError(e.message);
    }
  }

  if (editing) {
    return (
      <OfferEditForm
        offer={editing}
        onCancel={() => setEditing(null)}
        onSave={handleSave}
        saving={saving}
        error={error}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offers</h2>
          <p className="text-sm text-gray-600">
            Manage promotional offers shown on the Offers page.
          </p>
        </div>
        <button
          onClick={() => setEditing(newOffer())}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Plus className="w-4 h-4" /> New offer
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-500 py-12 text-center">Loading…</div>
      ) : offers.length === 0 ? (
        <div className="text-gray-500 py-12 text-center border-2 border-dashed rounded">
          No offers yet. Click "New offer" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 w-12">#</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-20">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700 w-44 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o, idx) => (
                <tr key={o.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {o.image_url && (
                        <img src={o.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{o.title_en || '—'}</div>
                        <div className="text-gray-500 text-xs" dir="rtl">{o.title_ar || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{o.price_en}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(o)}
                      className={`text-xs px-2 py-1 rounded font-semibold flex items-center gap-1 ${
                        o.visible
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {o.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {o.visible ? 'Visible' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleMove(idx, -1)}
                        disabled={idx === 0}
                        className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, 1)}
                        disabled={idx === offers.length - 1}
                        className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditing(o)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(o.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

// ----------- Edit form -----------

function OfferEditForm({
  offer,
  onCancel,
  onSave,
  saving,
  error,
}: {
  offer: Offer;
  onCancel: () => void;
  onSave: (o: Offer) => void;
  saving: boolean;
  error: string | null;
}) {
  const [draft, setDraft] = useState<Offer>(offer);

  const update = (patch: Partial<Offer>) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700 mb-1"
          >
            ← Back to offers
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {draft.id ? 'Edit offer' : 'New offer'}
          </h2>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-1">
        <BilingualInput
          label="Title"
          required
          valueEn={draft.title_en}
          valueAr={draft.title_ar}
          onChangeEn={(v) => update({ title_en: v })}
          onChangeAr={(v) => update({ title_ar: v })}
          placeholderEn="e.g. Multi-Brand Oil Change Offer"
          placeholderAr="مثال: عرض تغيير الزيت متعدد العلامات"
        />

        <BilingualInput
          label="Subtitle"
          multiline
          rows={2}
          valueEn={draft.subtitle_en ?? ''}
          valueAr={draft.subtitle_ar ?? ''}
          onChangeEn={(v) => update({ subtitle_en: v })}
          onChangeAr={(v) => update({ subtitle_ar: v })}
        />

        <BilingualInput
          label="Price"
          valueEn={draft.price_en ?? ''}
          valueAr={draft.price_ar ?? ''}
          onChangeEn={(v) => update({ price_en: v })}
          onChangeAr={(v) => update({ price_ar: v })}
          placeholderEn="from 199 AED"
          placeholderAr="من 199 درهم"
        />

        <BilingualInput
          label="Discount badge"
          valueEn={draft.discount_en ?? ''}
          valueAr={draft.discount_ar ?? ''}
          onChangeEn={(v) => update({ discount_en: v })}
          onChangeAr={(v) => update({ discount_ar: v })}
          placeholderEn="50% OFF"
          placeholderAr="خصم 50%"
        />

        <BilingualListInput
          label="Features (bullet list)"
          itemsEn={draft.features_en}
          itemsAr={draft.features_ar}
          onChange={(en, ar) => update({ features_en: en, features_ar: ar })}
        />

        <ImageUploader
          label="Offer image"
          value={draft.image_url}
          onChange={(url) => update({ image_url: url })}
          folder="offers"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={draft.popular}
              onChange={(e) => update({ popular: e.target.checked })}
              className="w-4 h-4"
            />
            Mark as "Most Popular"
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={draft.visible}
              onChange={(e) => update({ visible: e.target.checked })}
              className="w-4 h-4"
            />
            Visible on website
          </label>
        </div>

        {draft.popular && (
          <BilingualInput
            label="Popular badge label"
            valueEn={draft.popular_label_en ?? ''}
            valueAr={draft.popular_label_ar ?? ''}
            onChangeEn={(v) => update({ popular_label_en: v })}
            onChangeAr={(v) => update({ popular_label_ar: v })}
          />
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            WhatsApp pre-filled message
          </label>
          <textarea
            value={draft.whatsapp_message ?? ''}
            onChange={(e) => update({ whatsapp_message: e.target.value })}
            rows={2}
            placeholder="Hi! I'm interested in the {offer name} offer."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none text-sm"
          />
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
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
}
