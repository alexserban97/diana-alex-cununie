
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Trash } from 'lucide-react';
import { PageVisit } from '@/types/dashboard';

interface VisitsTableProps {
  visits: PageVisit[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onDeleteVisit: (id: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('ro-RO');
};

export const VisitsTable = ({ 
  visits, 
  isLoading, 
  currentPage, 
  itemsPerPage, 
  onPageChange, 
  onDeleteVisit 
}: VisitsTableProps) => {
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(visits.length / itemsPerPage);

  return (
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
                          onClick={() => onDeleteVisit(visit.id)}
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
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => onPageChange(page)}
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
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
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
  );
};
