import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listComplaints, searchComplaints, type Complaint } from '../APIs/complaints';
import { useToast } from '../components/ui/Toast';
import SearchBox from '../components/ui/SearchBox';
import { FileText } from 'lucide-react';

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await listComplaints();
      setComplaints(res.data);
    } catch (err: any) {
      toast(err.response?.data?.message || 'Failed to load complaints', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, aiEnabled: boolean) => {
    setSearching(true);
    try {
      const res = await searchComplaints(query, aiEnabled);
      setComplaints(res.data);
    } catch (err: any) {
      toast(err.response?.data?.message || 'Search failed', 'error');
    } finally {
      setSearching(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-(--color-text) tracking-tight">Complaints</h1>
          <p className="text-sm text-(--color-text-muted) mt-1">
            <span className="font-semibold text-(--color-primary)">{complaints.length}</span> complaint{complaints.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={fetchComplaints}
          className="text-xs font-semibold text-(--color-primary) hover:text-(--color-primary-hover) hover:underline underline-offset-4 transition-all cursor-pointer"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6">
        <SearchBox onSearch={handleSearch} loading={searching} />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-3 border-(--color-primary)/20 border-t-(--color-primary) rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-(--color-text-muted)">Loading complaints...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-20 glass-card shadow-premium rounded-3xl">
          <FileText size={48} className="text-(--color-text-muted)/30 mx-auto mb-4" />
          <p className="text-lg font-semibold text-(--color-text)">No complaints found</p>
          <p className="text-sm text-(--color-text-muted) mt-1">File a complaint from the Home page to get started</p>
        </div>
      ) : (
        <div className="glass-card shadow-premium rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--color-border)">
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">ID</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Title</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Complainant</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Place</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">IPC</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/complaints/${c.id}`)}
                    className="border-b border-(--color-border) last:border-0 hover:bg-(--color-bg-hover) cursor-pointer transition-all duration-200 group"
                  >
                    <td className="px-5 py-4 text-(--color-text-muted) font-mono text-xs font-bold">#{c.id}</td>
                    <td className="px-5 py-4 font-semibold text-(--color-text) group-hover:text-(--color-primary) transition-colors">{c.title}</td>
                    <td className="px-5 py-4 text-(--color-text)">{c.complainantName}</td>
                    <td className="px-5 py-4 text-(--color-text-muted)">{c.incidentPlace}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {c.ipcSections.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20"
                          >
                            §{s}
                          </span>
                        ))}
                        {c.ipcSections.length > 3 && (
                          <span className="text-[10px] text-(--color-text-muted) font-medium">+{c.ipcSections.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-(--color-text-muted) text-xs font-medium">{formatDate(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
