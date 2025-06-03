
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { FilterControls } from '@/components/dashboard/FilterControls';
import { VisitsTable } from '@/components/dashboard/VisitsTable';
import { PageVisit, DashboardStats, FilterState } from '@/types/dashboard';

const AdminDashboard = () => {
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    returningVisitors: 0,
    avgSessionTime: 0,
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    searchTerm: '',
    filterType: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }

    fetchVisits();
  }, [navigate, currentPage]);

  const fetchVisits = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('page_visits')
        .select('*')
        .order('visited_at', { ascending: false });

      if (filters.startDate) {
        query = query.gte('visited_at', filters.startDate);
      }
      if (filters.endDate) {
        query = query.lte('visited_at', filters.endDate + 'T23:59:59');
      }

      if (filters.searchTerm) {
        query = query.or(`ip_address.ilike.%${filters.searchTerm}%,country.ilike.%${filters.searchTerm}%,city.ilike.%${filters.searchTerm}%,browser.ilike.%${filters.searchTerm}%`);
      }

      if (filters.filterType !== 'all') {
        query = query.eq('device_type', filters.filterType);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Eroare la încărcarea datelor');
        console.error('Error fetching visits:', error);
        return;
      }

      // Convert ip_address from unknown to string
      const processedData = (data || []).map(visit => ({
        ...visit,
        ip_address: visit.ip_address?.toString() || 'N/A'
      }));

      setVisits(processedData);
      calculateStats(processedData);
    } catch (error) {
      toast.error('Eroare la încărcarea datelor');
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const calculateStats = (visitData: PageVisit[]) => {
    const totalVisits = visitData.length;
    const uniqueIPs = new Set(visitData.map(v => v.ip_address)).size;
    const returningVisitors = totalVisits - uniqueIPs;
    
    const deviceCounts = visitData.reduce((acc, visit) => {
      const deviceType = visit.device_type?.toLowerCase() || 'unknown';
      if (deviceType.includes('mobile')) acc.mobile++;
      else if (deviceType.includes('tablet')) acc.tablet++;
      else acc.desktop++;
      return acc;
    }, { mobile: 0, desktop: 0, tablet: 0 });

    const avgSessionTime = visitData
      .filter(v => v.session_duration)
      .reduce((acc, v) => acc + (v.session_duration || 0), 0) / visitData.length || 0;

    setStats({
      totalVisits,
      uniqueVisitors: uniqueIPs,
      returningVisitors,
      avgSessionTime,
      deviceStats: deviceCounts
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUsername');
    navigate('/admin-login');
  };

  const exportToCSV = () => {
    const headers = [
      'Data/Ora',
      'IP Address',
      'Țară',
      'Oraș',
      'Fus Orar',
      'Limbă',
      'Dispozitiv',
      'Browser',
      'Sistem Operare',
      'Rezoluție',
      'URL Pagina',
      'Referrer',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'Timp Răspuns (ms)',
      'Durată Sesiune (s)',
      'User Agent'
    ];

    const csvData = visits.map(visit => [
      new Date(visit.visited_at).toLocaleString('ro-RO'),
      visit.ip_address,
      visit.country,
      visit.city,
      visit.timezone || 'N/A',
      visit.language || 'N/A',
      visit.device_type,
      visit.browser,
      visit.operating_system,
      visit.screen_resolution || 'N/A',
      visit.page_url,
      visit.referrer || 'Direct',
      visit.utm_source || 'N/A',
      visit.utm_medium || 'N/A',
      visit.utm_campaign || 'N/A',
      visit.response_time || 'N/A',
      visit.session_duration || 'N/A',
      visit.user_agent
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `accesari-extins-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteVisit = async (id: string) => {
    try {
      const { error } = await supabase
        .from('page_visits')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Eroare la ștergerea înregistrării');
        return;
      }

      toast.success('Înregistrarea a fost ștearsă');
      fetchVisits();
    } catch (error) {
      toast.error('Eroare la ștergerea înregistrării');
      console.error('Error deleting visit:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Accesări Extins</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <StatsCards stats={stats} />

        <FilterControls 
          filters={filters}
          onFilterChange={setFilters}
          onRefresh={fetchVisits}
          onExport={exportToCSV}
        />

        <VisitsTable 
          visits={visits}
          isLoading={isLoading}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onDeleteVisit={deleteVisit}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
