// ============================================================================
// AdminSettings — bilingual key/value site settings (footer text, contact, etc.)
// ============================================================================

import { useEffect, useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { fetchSiteSettings, adminUpdateSetting, type SiteSetting } from '../../lib/cms';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, SiteSetting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const map = await fetchSiteSettings();
      setSettings(map);
      setError(null);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function saveOne(key: string) {
    setSaving(true);
    setError(null);
    try {
      const s = settings[key];
      await adminUpdateSetting(key, s.value_en, s.value_ar);
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  }

  function update(key: string, field: 'value_en' | 'value_ar', value: string) {
    setSettings((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  }

  const keys = Object.keys(settings).sort();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site settings</h2>
          <p className="text-sm text-gray-600">
            Footer text, contact info, and other site-wide content. Edit + save each row individually.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <RefreshCw className="w-4 h-4" /> Reload
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

      {loading ? (
        <div className="text-gray-500 py-12 text-center">Loading…</div>
      ) : keys.length === 0 ? (
        <div className="text-gray-500 py-12 text-center border-2 border-dashed rounded">
          No settings yet — schema seed data may not have run.
        </div>
      ) : (
        <div className="space-y-4">
          {keys.map((key) => {
            const s = settings[key];
            return (
              <div key={key} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-700">{key}</code>
                    {s.description && <p className="text-xs text-gray-500 mt-1">{s.description}</p>}
                  </div>
                  <button
                    onClick={() => saveOne(key)}
                    disabled={saving}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" />
                    {savedKey === key ? 'Saved!' : 'Save'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <span className="inline-block w-5 h-3 rounded bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">EN</span>
                      English
                    </div>
                    <input
                      type="text" dir="ltr"
                      value={s.value_en ?? ''}
                      onChange={(e) => update(key, 'value_en', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <span className="inline-block w-5 h-3 rounded bg-green-100 text-green-700 font-bold text-[10px] flex items-center justify-center">AR</span>
                      العربية
                    </div>
                    <input
                      type="text" dir="rtl" lang="ar"
                      value={s.value_ar ?? ''}
                      onChange={(e) => update(key, 'value_ar', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-red-500"
                      style={{ fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
