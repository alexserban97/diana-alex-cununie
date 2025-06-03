
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, RefreshCw, Search } from 'lucide-react';
import { FilterState } from '@/types/dashboard';

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onRefresh: () => void;
  onExport: () => void;
}

export const FilterControls = ({ filters, onFilterChange, onRefresh, onExport }: FilterControlsProps) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
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
              value={filters.startDate}
              onChange={(e) => updateFilter('startDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Data sfârșit</label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => updateFilter('endDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Căutare</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="IP, țară, oraș, browser..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tip dispozitiv</label>
            <Select value={filters.filterType} onValueChange={(value) => updateFilter('filterType', value)}>
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
            <Button onClick={onRefresh} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizează
            </Button>
            <Button onClick={onExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
