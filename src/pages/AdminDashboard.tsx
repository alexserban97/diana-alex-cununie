
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download, LogOut, RefreshCw } from 'lucide-react';

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
}

const AdminDashboard = () => {
  const [visits, setVisits] = useState<PageVisit[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }

    fetchVisits();
  }, [navigate]);

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

      const { data, error } = await query;

      if (error) {
        toast.error('Eroare la încărcarea datelor');
        console.error('Error fetching visits:', error);
        return;
      }

      setVisits(data || []);
      setTotalVisits(data?.length || 0);
    } catch (error) {
      toast.error('Eroare la încărcarea datelor');
      console.error('Error:', error);
    }
    setIsLoading(false);
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
      'Dispozitiv',
      'Browser',
      'Sistem Operare',
      'URL Pagina',
      'Referrer'
    ];

    const csvData = visits.map(visit => [
      new Date(visit.visited_at).toLocaleString('ro-RO'),
      visit.ip_address,
      visit.country,
      visit.city,
      visit.device_type,
      visit.browser,
      visit.operating_system,
      visit.page_url,
      visit.referrer || 'Direct'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `accesari-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ro-RO');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Accesări</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Accesări</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{totalVisits}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perioada Filtrare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Data început"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Data sfârșit"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acțiuni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={fetchVisits} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizează
              </Button>
              <Button onClick={exportToCSV} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Istoric Accesări</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Se încarcă...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Ora</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Locație</TableHead>
                      <TableHead>Dispozitiv</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>SO</TableHead>
                      <TableHead>Pagina</TableHead>
                      <TableHead>Referrer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-mono text-sm">
                          {formatDate(visit.visited_at)}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {visit.ip_address}
                        </TableCell>
                        <TableCell>
                          {visit.city}, {visit.country}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            visit.device_type === 'Mobile' ? 'bg-green-100 text-green-800' :
                            visit.device_type === 'Tablet' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {visit.device_type}
                          </span>
                        </TableCell>
                        <TableCell>{visit.browser}</TableCell>
                        <TableCell>{visit.operating_system}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {visit.page_url}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {visit.referrer || 'Direct'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {visits.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Nu există accesări înregistrate pentru perioada selectată.
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
