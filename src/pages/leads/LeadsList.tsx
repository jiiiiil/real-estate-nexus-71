import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTablePagination } from '@/components/DataTablePagination';
import { Badge } from '@/components/ui/badge';
import { useLeads } from '@/modules/leads/hooks';
import { Plus, Search, Loader2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeadsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, error } = useLeads({ search, status, page, limit });

  const statusColors: Record<string, string> = {
    new: 'bg-blue-500',
    contacted: 'bg-yellow-500',
    qualified: 'bg-green-500',
    converted: 'bg-purple-500',
    lost: 'bg-red-500',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
            <p className="text-muted-foreground">Manage your sales leads</p>
          </div>
          <Button onClick={() => navigate('/leads/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <p className="text-destructive font-medium">Failed to load leads</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {error?.message || 'Please check your backend connection'}
                </p>
              </div>
            ) : data && data.data.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {data.data.map((lead) => (
                        <tr key={lead.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{lead.name}</td>
                          <td className="px-6 py-4 text-sm">{lead.phone}</td>
                          <td className="px-6 py-4 text-sm">{lead.email || '-'}</td>
                          <td className="px-6 py-4">
                            <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                          </td>
                          <td className="px-6 py-4 text-sm">{lead.source}</td>
                          <td className="px-6 py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/leads/${lead.id}`)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <DataTablePagination
                  currentPage={data.meta.page}
                  totalPages={data.meta.totalPages}
                  pageSize={limit}
                  totalItems={data.meta.total}
                  onPageChange={setPage}
                  onPageSizeChange={setLimit}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="font-medium">No leads found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Get started by adding your first lead
                </p>
                <Button className="mt-4" onClick={() => navigate('/leads/new')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lead
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
