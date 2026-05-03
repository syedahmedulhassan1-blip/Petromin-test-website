import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WhatsAppLead {
  id: string;
  offer_title: string;
  offer_subtitle: string | null;
  clicked_at: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
}

interface WhatsAppCustomer {
  id: string;
  phone_number: string;
  name: string;
  email: string | null;
  location: string | null;
  language: string;
  opted_in: boolean;
  opted_in_at: string | null;
  opted_out_at: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function WhatsAppCustomers() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'customers'>('leads');
  const [leads, setLeads] = useState<WhatsAppLead[]>([]);
  const [customers, setCustomers] = useState<WhatsAppCustomer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptedIn, setFilterOptedIn] = useState<'all' | 'opted_in' | 'opted_out'>('all');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (activeTab === 'leads') {
        const { data, error } = await supabase
          .from('whatsapp_leads')
          .select('*')
          .order('clicked_at', { ascending: false });

        if (error) throw error;
        setLeads(data || []);
      } else {
        const { data, error } = await supabase
          .from('whatsapp_customers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCustomers(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      lead.offer_title?.toLowerCase().includes(searchLower) ||
      lead.customer_name?.toLowerCase().includes(searchLower) ||
      lead.customer_phone?.toLowerCase().includes(searchLower) ||
      lead.customer_email?.toLowerCase().includes(searchLower)
    );
  });

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      customer.name.toLowerCase().includes(searchLower) ||
      customer.phone_number.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower);

    const matchesFilter =
      filterOptedIn === 'all' ||
      (filterOptedIn === 'opted_in' && customer.opted_in) ||
      (filterOptedIn === 'opted_out' && !customer.opted_in);

    return matchesSearch && matchesFilter;
  });

  const exportToCSV = () => {
    const data = activeTab === 'leads' ? filteredLeads : filteredCustomers;
    const headers =
      activeTab === 'leads'
        ? ['Offer Title', 'Customer Name', 'Phone', 'Email', 'Clicked At']
        : ['Name', 'Phone', 'Email', 'Location', 'Language', 'Status', 'Created At'];

    const csvContent = [
      headers.join(','),
      ...data.map((item: WhatsAppLead | WhatsAppCustomer) =>
        activeTab === 'leads'
          ? [
              (item as WhatsAppLead).offer_title,
              (item as WhatsAppLead).customer_name || '',
              (item as WhatsAppLead).customer_phone || '',
              (item as WhatsAppLead).customer_email || '',
              (item as WhatsAppLead).clicked_at,
            ].join(',')
          : [
              (item as WhatsAppCustomer).name,
              (item as WhatsAppCustomer).phone_number,
              (item as WhatsAppCustomer).email || '',
              (item as WhatsAppCustomer).location || '',
              (item as WhatsAppCustomer).language,
              (item as WhatsAppCustomer).opted_in ? 'Opted In' : 'Opted Out',
              (item as WhatsAppCustomer).created_at,
            ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/analytics"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">WhatsApp CRM</h1>
              <p className="text-gray-600 mt-1">Manage leads and customers</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                  activeTab === 'leads'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                WhatsApp Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                  activeTab === 'customers'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Registered Customers ({customers.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              {activeTab === 'customers' && (
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400 w-5 h-5" />
                  <select
                    value={filterOptedIn}
                    onChange={(e) => setFilterOptedIn(e.target.value as 'all' | 'opted_in' | 'opted_out')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="opted_in">Opted In</option>
                    <option value="opted_out">Opted Out</option>
                  </select>
                </div>
              )}

              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {activeTab === 'leads' ? (
              filteredLeads.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Offer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Clicked At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {lead.offer_title}
                              </p>
                              {lead.offer_subtitle && (
                                <p className="text-sm text-gray-500">{lead.offer_subtitle}</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-900">
                              {lead.customer_name || 'Anonymous'}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {lead.customer_phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Phone className="w-4 h-4" />
                                  <a
                                    href={`tel:${lead.customer_phone}`}
                                    className="hover:text-red-600"
                                  >
                                    {lead.customer_phone}
                                  </a>
                                </div>
                              )}
                              {lead.customer_email && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Mail className="w-4 h-4" />
                                  <a
                                    href={`mailto:${lead.customer_email}`}
                                    className="hover:text-red-600"
                                  >
                                    {lead.customer_email}
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(lead.clicked_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No WhatsApp leads found</p>
                </div>
              )
            ) : filteredCustomers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Language
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                          {customer.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {customer.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              <a
                                href={`tel:${customer.phone_number}`}
                                className="hover:text-red-600"
                              >
                                {customer.phone_number}
                              </a>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                <a
                                  href={`mailto:${customer.email}`}
                                  className="hover:text-red-600"
                                >
                                  {customer.email}
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {customer.location ? (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {customer.location}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Globe className="w-4 h-4" />
                            {customer.language.toUpperCase()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {customer.opted_in ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600">Opted In</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-600">Opted Out</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(customer.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No customers found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
