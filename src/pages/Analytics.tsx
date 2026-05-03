import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart3, Calendar, Download, TrendingUp, Users, MessageSquare, Send, DollarSign } from 'lucide-react';
import { logger } from '../utils/logger';

interface WhatsAppLead {
  id: string;
  offer_title: string;
  offer_subtitle: string;
  clicked_at: string;
  user_agent: string;
  referrer: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
}

interface OfferStats {
  offer_title: string;
  count: number;
  percentage: number;
}

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<'leads' | 'messaging'>('leads');
  const [leads, setLeads] = useState<WhatsAppLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  const [messagingStats, setMessagingStats] = useState({
    totalSent: 0,
    totalDelivered: 0,
    totalRead: 0,
    totalFailed: 0,
    totalCost: 0,
    messagesByStatus: [] as Array<{ status: string; count: number }>,
    messagesByDay: [] as Array<{ date: string; count: number }>,
  });

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('whatsapp_leads')
      .select('*')
      .gte('clicked_at', `${dateRange.start}T00:00:00`)
      .lte('clicked_at', `${dateRange.end}T23:59:59`)
      .order('clicked_at', { ascending: false });

    if (error) {
      logger.error('Error fetching leads:', error instanceof Error ? error : new Error(String(error)));
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const fetchMessagingStats = async () => {
    setLoading(true);
    try {
      const { data: messages, error } = await supabase
        .from('whatsapp_sent_messages')
        .select('*')
        .gte('created_at', `${dateRange.start}T00:00:00`)
        .lte('created_at', `${dateRange.end}T23:59:59`);

      if (error) throw error;

      const totalSent = messages?.filter(m => m.status === 'sent' || m.status === 'delivered' || m.status === 'read').length || 0;
      const totalDelivered = messages?.filter(m => m.status === 'delivered' || m.status === 'read').length || 0;
      const totalRead = messages?.filter(m => m.status === 'read').length || 0;
      const totalFailed = messages?.filter(m => m.status === 'failed').length || 0;
      const totalCost = messages?.reduce((sum, m) => sum + (parseFloat(m.cost) || 0), 0) || 0;

      const statusCounts = messages?.reduce((acc, m) => {
        acc[m.status] = (acc[m.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const messagesByStatus = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count: count as number,
      }));

      const dayCounts = messages?.reduce((acc, m) => {
        const date = new Date(m.created_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const messagesByDay = Object.entries(dayCounts)
        .map(([date, count]) => ({ date, count: count as number }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setMessagingStats({
        totalSent,
        totalDelivered,
        totalRead,
        totalFailed,
        totalCost,
        messagesByStatus,
        messagesByDay,
      });
    } catch (error) {
      logger.error('Error fetching messaging stats:', error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    } else if (activeTab === 'messaging') {
      fetchMessagingStats();
    }
  }, [dateRange, activeTab]);

  const getOfferStats = (): OfferStats[] => {
    const offerCounts = leads.reduce((acc, lead) => {
      acc[lead.offer_title] = (acc[lead.offer_title] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = leads.length;
    return Object.entries(offerCounts)
      .map(([offer_title, count]) => ({
        offer_title,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  };

  const exportToCSV = () => {
    const headers = ['Date & Time', 'Phone Number', 'Offer Title', 'Offer Subtitle', 'Device'];
    const rows = leads.map(lead => [
      new Date(lead.clicked_at).toLocaleString(),
      lead.customer_phone || 'Not provided',
      lead.offer_title,
      lead.offer_subtitle || '',
      lead.user_agent?.includes('Mobile') ? 'Mobile' : 'Desktop',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatsapp-leads-${dateRange.start}-to-${dateRange.end}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateMonthlyReport = () => {
    const offerStats = getOfferStats();
    const leadsWithPhone = leads.filter(lead => lead.customer_phone);

    const report = `
PETROMIN EXPRESS - WHATSAPP LEADS REPORT
Period: ${dateRange.start} to ${dateRange.end}
Generated: ${new Date().toLocaleString()}

========================================
SUMMARY
========================================
Total Leads: ${leads.length}
Leads with Phone Numbers: ${leadsWithPhone.length}

========================================
LEADS BY OFFER
========================================
${offerStats.map(stat =>
  `${stat.offer_title}: ${stat.count} leads (${stat.percentage.toFixed(1)}%)`
).join('\n')}

========================================
DETAILED BREAKDOWN
========================================
${leads.map((lead, index) =>
  `${index + 1}. ${new Date(lead.clicked_at).toLocaleString()}
   Phone: ${lead.customer_phone || 'Not provided'}
   Offer: ${lead.offer_title}
   ${lead.offer_subtitle ? `Subtitle: ${lead.offer_subtitle}` : ''}
   Device: ${lead.user_agent?.includes('Mobile') ? 'Mobile' : 'Desktop'}
`).join('\n')}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly-report-${dateRange.start}-to-${dateRange.end}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const offerStats = getOfferStats();
  const leadsWithPhone = leads.filter(lead => lead.customer_phone);
  const phoneConversionRate = leads.length > 0 ? (leadsWithPhone.length / leads.length) * 100 : 0;

  return (
    <div className="pt-32 min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8" />
            <h1 className="text-4xl font-bold">WhatsApp Analytics</h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Track and analyze WhatsApp performance
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'leads'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Users className="w-5 h-5" />
              Offer Leads
            </button>
            <button
              onClick={() => setActiveTab('messaging')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'messaging'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Daily Messaging
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'leads' ? (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date Range
                </label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="flex items-center text-gray-500">to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={exportToCSV}
                  disabled={leads.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <button
                  onClick={generateMonthlyReport}
                  disabled={leads.length === 0}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Monthly Report
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Total Leads</h3>
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900">{leads.length}</p>
              <p className="text-sm text-gray-500 mt-1">WhatsApp clicks tracked</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Phone Numbers</h3>
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900">{leadsWithPhone.length}</p>
              <p className="text-sm text-gray-500 mt-1">{phoneConversionRate.toFixed(1)}% shared contact</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Active Offers</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-4xl font-bold text-gray-900">{offerStats.length}</p>
              <p className="text-sm text-gray-500 mt-1">Offers generating leads</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">Top Performer</h3>
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {offerStats[0]?.offer_title.substring(0, 20) || 'N/A'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {offerStats[0]?.count || 0} leads ({offerStats[0]?.percentage.toFixed(1) || 0}%)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Leads by Offer</h2>
            <div className="space-y-4">
              {offerStats.map((stat, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{stat.offer_title}</h3>
                    <span className="text-lg font-bold text-red-600">{stat.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full transition-all"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{stat.percentage.toFixed(1)}% of total leads</p>
                </div>
              ))}
              {offerStats.length === 0 && (
                <p className="text-gray-500 text-center py-8">No leads found for the selected date range</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Leads</h2>
            {loading ? (
              <p className="text-center py-8 text-gray-500">Loading leads...</p>
            ) : leads.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No leads found for the selected date range</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Offer</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Device</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leads.slice(0, 50).map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                          {new Date(lead.clicked_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                          {lead.customer_phone || <span className="text-gray-400">Not provided</span>}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{lead.offer_title}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {lead.user_agent?.includes('Mobile') ? 'Mobile' : 'Desktop'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {leads.length > 50 && (
                  <p className="text-center py-4 text-sm text-gray-500">
                    Showing 50 of {leads.length} leads. Export for full data.
                  </p>
                )}
              </div>
            )}
          </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date Range
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <span className="flex items-center text-gray-500">to</span>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-600">Sent</h3>
                    <Send className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{messagingStats.totalSent}</p>
                  <p className="text-sm text-gray-500 mt-1">Messages sent</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-600">Delivered</h3>
                    <Send className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{messagingStats.totalDelivered}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {messagingStats.totalSent > 0
                      ? ((messagingStats.totalDelivered / messagingStats.totalSent) * 100).toFixed(1)
                      : 0}% delivery rate
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-600">Read</h3>
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{messagingStats.totalRead}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {messagingStats.totalSent > 0
                      ? ((messagingStats.totalRead / messagingStats.totalSent) * 100).toFixed(1)
                      : 0}% read rate
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-600">Failed</h3>
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{messagingStats.totalFailed}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {messagingStats.totalSent + messagingStats.totalFailed > 0
                      ? ((messagingStats.totalFailed / (messagingStats.totalSent + messagingStats.totalFailed)) * 100).toFixed(1)
                      : 0}% failure rate
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-600">Cost</h3>
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">${messagingStats.totalCost.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">Total spent</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages by Status</h2>
                  <div className="space-y-4">
                    {messagingStats.messagesByStatus.map((stat, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-gray-900 capitalize">{stat.status}</h3>
                          <span className="text-lg font-bold text-blue-600">{stat.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              stat.status === 'sent' || stat.status === 'delivered'
                                ? 'bg-green-600'
                                : stat.status === 'read'
                                ? 'bg-purple-600'
                                : stat.status === 'failed'
                                ? 'bg-red-600'
                                : 'bg-gray-600'
                            }`}
                            style={{
                              width: `${
                                ((stat.count / messagingStats.messagesByStatus.reduce((sum, s) => sum + s.count, 0)) * 100) || 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {messagingStats.messagesByStatus.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No messages sent in the selected date range</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages by Day</h2>
                  <div className="space-y-4">
                    {messagingStats.messagesByDay.map((stat, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-gray-900">{new Date(stat.date).toLocaleDateString()}</h3>
                          <span className="text-lg font-bold text-red-600">{stat.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-red-600 h-3 rounded-full transition-all"
                            style={{
                              width: `${
                                ((stat.count / Math.max(...messagingStats.messagesByDay.map(s => s.count), 1)) * 100) || 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {messagingStats.messagesByDay.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No messages sent in the selected date range</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
