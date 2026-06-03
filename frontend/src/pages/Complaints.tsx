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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Complaints</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            <span className="font-semibold text-indigo-500">{complaints.length}</span> complaint{complaints.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={fetchComplaints}
          className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 hover:underline underline-offset-4 cursor-pointer"
        >
          Refresh
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <SearchBox onSearch={handleSearch} loading={searching} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto" style={{ marginBottom: '12px' }}></div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading complaints...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="glass-card shadow-premium" style={{ textAlign: 'center', padding: '80px 32px', borderRadius: '24px' }}>
          <FileText size={48} className="mx-auto" style={{ color: 'var(--color-text-muted)', opacity: 0.3, marginBottom: '16px' }} />
          <p className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>No complaints found</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>File a complaint from the Home page to get started</p>
        </div>
      ) : (
        <div className="glass-card shadow-premium" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>ID</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Title</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Complainant</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Place</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>IPC</th>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/complaints/${c.id}`)}
                    style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer', transition: 'background-color 0.2s' }}
                    className="hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5"
                  >
                    <td style={{ padding: '16px 20px', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)' }}>#{c.id}</td>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--color-text)' }}>{c.title}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-text)' }}>{c.complainantName}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--color-text-muted)' }}>{c.incidentPlace}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {c.ipcSections.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20"
                            style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}
                          >
                            §{s}
                          </span>
                        ))}
                        {c.ipcSections.length > 3 && (
                          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 500 }}>+{c.ipcSections.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 500, color: 'var(--color-text-muted)' }}>{formatDate(c.createdAt)}</td>
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
