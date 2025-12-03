import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassInput } from '@/components/ui/GlassInput';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { DataTablePagination } from '@/components/DataTablePagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeads } from '@/modules/leads/hooks';
import { Plus, Search, Loader2, Users, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LeadsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, error } = useLeads({ search, status, page, limit });

  const getStatusVariant = (status: string) => {
    const variants: Record<string, 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'> = {
      new: 'new',
      contacted: 'contacted',
      qualified: 'qualified',
      converted: 'converted',
      lost: 'lost',
    };
    return variants[status] || 'default';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-glass-text">Leads</h1>
            <p className="text-glass-muted mt-1">Manage your sales leads</p>
          </div>
          <GlassButton onClick={() => navigate('/leads/new')}>
            <Plus className="w-4 h-4" />
            Add Lead
          </GlassButton>
        </div>

        {/* Filters */}
        <GlassCard className="p-4" hover={false}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <GlassInput
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[200px] glass-input">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border">
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlassCard>

        {/* Table */}
        <GlassCard className="overflow-hidden" hover={false}>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-mint" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <p className="text-red-400 font-medium">Failed to load leads</p>
              <p className="text-sm text-glass-muted mt-2">
                {error?.message || 'Please check your backend connection'}
              </p>
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-glass-border bg-white/[0.02]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-glass-muted uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-glass-muted uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-glass-muted uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-glass-muted uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-glass-muted uppercase tracking-wider">Source</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-glass-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-border">
                    {data.data.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-glass-text">{lead.name}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-glass-muted">{lead.phone}</td>
                        <td className="px-6 py-4 text-sm text-glass-muted">{lead.email || '-'}</td>
                        <td className="px-6 py-4">
                          <GlassBadge variant={getStatusVariant(lead.status)}>
                            {lead.status}
                          </GlassBadge>
                        </td>
                        <td className="px-6 py-4 text-sm text-glass-muted">{lead.source}</td>
                        <td className="px-6 py-4">
                          <GlassButton
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/leads/${lead.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </GlassButton>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-glass-border">
                <DataTablePagination
                  currentPage={data.meta.page}
                  totalPages={data.meta.totalPages}
                  pageSize={limit}
                  totalItems={data.meta.total}
                  onPageChange={setPage}
                  onPageSizeChange={setLimit}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-glass-border/50 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-glass-muted" />
              </div>
              <p className="font-medium text-glass-text">No leads found</p>
              <p className="text-sm text-glass-muted mt-2">
                Get started by adding your first lead
              </p>
              <GlassButton className="mt-4" onClick={() => navigate('/leads/new')}>
                <Plus className="w-4 h-4" />
                Add Lead
              </GlassButton>
            </div>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
