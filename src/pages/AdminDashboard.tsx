
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download, LogOut, RefreshCw, Search, Trash } from 'lucide-react';

interface PageVisit {
  id: string;
  ip_address: string;
  visited_at: string;
  device_type: string;
  browser: string;
  operating_system: string;
  country: string;
  city: string;
  page_url: string;
  referrer: string;
  user_agent: string;
  timezone?: string;
  language?: string;
  screen_resolution?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  response_time?: number;
  session_duration?: number;
}

interface DashboardStats {
  totalVisits: number;
  uniqueVisitors: number;
  returningVisitors: number;
  avgSessionTime: number;
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
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

      if (startDate) {
        query = query.gte('visited_at', startDate);
      }
      if (endDate) {
        query = query.lte('visited_at', endDate + 'T23:59:59');
      }

      if (searchTerm) {
        query = query.or(`ip_address.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,browser.ilike.%${searchTerm}%`);
      }

      if (filterType !== 'all') {
        query = query.eq('device_type', filterType);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ro-RO');
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(visits.length / itemsPerPage);

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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Accesări</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalVisits}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vizitatori Unici</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.uniqueVisitors}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Vizitatori Recurenți</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.returningVisitors}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Timp Mediu Sesiune</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatDuration(Math.round(stats.avgSessionTime))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Desktop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-600">{stats.deviceStats.desktop}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Mobile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-600">{stats.deviceStats.mobile}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tablet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-600">{stats.deviceStats.tablet}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtre și Acțiuni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Data început</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data sfârșit</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Căutare</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="IP, țară, oraș, browser..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tip dispozitiv</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toate</SelectItem>
                    <SelectItem value="Desktop">Desktop</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-end">
                <Button onClick={fetchVisits} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualizează
                </Button>
                <Button onClick={exportToCSV} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visits Table */}
        <Card>
          <CardHeader>
            <CardTitle>Istoric Accesări ({visits.length} înregistrări)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Se încarcă...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data/Ora</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Locație</TableHead>
                        <TableHead>Dispozitiv</TableHead>
                        <TableHead>Browser/OS</TableHead>
                        <TableHead>Pagina</TableHead>
                        <TableHead>Referrer</TableHead>
                        <TableHead>UTM</TableHead>
                        <TableHead>Acțiuni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map((visit) => (
                        <TableRow key={visit.id}>
                          <TableCell className="font-mono text-sm">
                            {formatDate(visit.visited_at)}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {visit.ip_address}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{visit.city}, {visit.country}</div>
                              {visit.timezone && <div className="text-gray-500 text-xs">{visit.timezone}</div>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <span className={`px-2 py-1 rounded text-xs ${
                                visit.device_type === 'Mobile' ? 'bg-green-100 text-green-800' :
                                visit.device_type === 'Tablet' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {visit.device_type}
                              </span>
                              {visit.screen_resolution && (
                                <div className="text-gray-500 text-xs mt-1">{visit.screen_resolution}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{visit.browser}</div>
                              <div className="text-gray-500 text-xs">{visit.operating_system}</div>
                              {visit.language && <div className="text-gray-500 text-xs">{visit.language}</div>}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="text-sm truncate" title={visit.page_url}>
                              {visit.page_url}
                            </div>
                            {visit.response_time && (
                              <div className="text-gray-500 text-xs">{visit.response_time}ms</div>
                            )}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="text-sm truncate" title={visit.referrer || 'Direct'}>
                              {visit.referrer || 'Direct'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              {visit.utm_source && <div>S: {visit.utm_source}</div>}
                              {visit.utm_medium && <div>M: {visit.utm_medium}</div>}
                              {visit.utm_campaign && <div>C: {visit.utm_campaign}</div>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteVisit(visit.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash className="w-3 h-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}

                {visits.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nu există accesări înregistrate pentru criteriile selectate.
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
