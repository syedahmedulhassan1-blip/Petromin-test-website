// ============================================================================
// Analytics — Admin Dashboard
// ----------------------------------------------------------------------------
// Tabs:
//   • WhatsApp Leads (read-only stats from whatsapp_leads table)
//   • Offers, Services, Testimonials, Hero Slides, Site Settings (CMS)
// ============================================================================

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  BarChart3, Users, Tag, Wrench, FileText, Image as ImageIcon,
  Settings as SettingsIcon, Download,
} from 'lucide-react';
import AdminOffers from '../components/admin/AdminOffers';
import AdminServices from '../components/admin/AdminServices';
import AdminTestimonials from '../components/admin/AdminTestimonials';
import AdminHero from '../components/admin/AdminHero';
import AdminSettings from '../components/admin/AdminSettings';

type Tab =
  | 'leads'
  | 'offers'
  | 'services'
  | 'testimonials'
  | 'hero'
  | 'settings';

interface WhatsAppLead {
  id: string;
  offer_title: string;
  clicked_at: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
}

const TABS: { key: Tab; label: string; icon: typeof Users }[] = [
  { key: 'leads',        label: 'WhatsApp Leads',  icon: Users },
  { key: 'offers',       label: 'Offers',          icon: Tag },
  { key: 'services',     label: 'Services',        icon: Wrench },
  { key: 'testimonials', label: 'Testimonials',    icon: FileText },
  { key: 'hero',         label: 'Hero Slides',     icon: ImageIcon },
  { key: 'settings',     label: 'Site Settings',   icon: SettingsIcon },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<Tab>('leads');

  return (
    <div className="pt-32 min-h-screen bg-gray-50">
      {/* Header bar with title and tabs */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-lg text-gray-300 mb-6">
            Manage analytics, content, and site settings
          </p>

          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
                    active
                      ? 'bg-white text-gray-900'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'leads'        && <LeadsTab />}
          {activeTab === 'offers'       && <AdminOffers />}
          {activeTab === 'services'     && <AdminServices />}
          {activeTab === 'testimonials' && <AdminTestimonials />}
          {activeTab === 'hero'         && <AdminHero />}
          {activeTab === 'settings'     && <AdminSettings />}
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------------------
// LeadsTab — simplified version of the original WhatsApp leads view
// ----------------------------------------------------------------------------

function LeadsTab() {
  const today = new Date().toISOString().split('T')[0];
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString().split('T')[0];

  const [leads, setLeads] = useState<WhatsAppLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [start, setStart] = useState(monthStart);
  const [end, setEnd] = useState(today);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('whatsapp_leads')
        .select('id, offer_title, clicked_at, customer_name, customer_phone, customer_email')
        .gte('clicked_at', `${start}T00:00:00`)
        .lte('clicked_at', `${end}T23:59:59`)
        .order('clicked_at', { ascending: false });
      if (error) throw error;
      setLeads((data ?? []) as WhatsAppLead[]);
    } catch (e: any) {
      setError(e.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  // Aggregate stats
  const total = leads.length;
  const withPhone = leads.filter((l) => l.customer_phone).length;
  const phoneRate = total ? ((withPhone / total) * 100).toFixed(1) : '0.0';

  const offerCounts: Record<string, number> = {};
  leads.forEach((l) => {
    const t = l.offer_title || 'Unknown';
    offerCounts[t] = (offerCounts[t] || 0) + 1;
  });
  const offerStats = Object.entries(offerCounts)
    .map(([title, count]) => ({ title, count, pct: total ? (count / total) * 100 : 0 }))
    .sort((a, b) => b.count - a.count);

  function exportCSV() {
    const rows = [
      ['Offer', 'Clicked At', 'Name', 'Phone', 'Email'],
      ...leads.map((l) => [
        l.offer_title || '',
        l.clicked_at || '',
        l.customer_name || '',
        l.customer_phone || '',
        l.customer_email || '',
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatsapp-leads-${start}-to-${end}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date range</label>
            <div className="flex items-center gap-3">
              <input
                type="date" value={start} onChange={(e) => setStart(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="date" value={end} onChange={(e) => setEnd(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <button
            onClick={exportCSV}
            disabled={loading || leads.length === 0}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total Leads" value={total.toString()} subtitle="WhatsApp clicks tracked" />
        <SummaryCard title="Phone Numbers" value={withPhone.toString()} subtitle={`${phoneRate}% shared contact`} />
        <SummaryCard title="Active Offers" value={offerStats.length.toString()} subtitle="Generating leads" />
      </div>

      {/* Leads by offer */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Leads by Offer</h3>
        {loading ? (
          <p className="text-gray-500 py-8 text-center">Loading…</p>
        ) : offerStats.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">No leads in this date range yet.</p>
        ) : (
          <div className="space-y-3">
            {offerStats.map((s) => (
              <div key={s.title}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-900">{s.title}</span>
                  <span className="text-gray-600">{s.count} ({s.pct.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent leads table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Recent Leads</h3>
        </div>
        {loading ? (
          <p className="text-gray-500 py-8 text-center">Loading…</p>
        ) : leads.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">No leads in this range.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Offer</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">When</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900 font-medium">{l.offer_title || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{new Date(l.clicked_at).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-700">{l.customer_name || '—'}</td>
                    <td className="px-4 py-3 text-gray-700" dir="ltr">{l.customer_phone || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{l.customer_email || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}
