import { useState } from 'react';
import { searchUsers, updateUserLimits } from '../APIs/admin';
import { useToast } from '../components/ui/Toast';
import Button from '../components/form/Button';
import { Search, Loader2 } from 'lucide-react';
import type { User } from '../APIs/auth';

type UserWithoutPassword = Omit<User, 'passwordHash'>;

export default function Admin() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserWithoutPassword[]>([]);
  const [searching, setSearching] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUpload, setEditUpload] = useState('');
  const [editSearch, setEditSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await searchUsers(query.trim());
      setUsers(res.data);
    } catch (err: any) {
      toast(err.response?.data?.message || 'Search failed', 'error');
    } finally {
      setSearching(false);
    }
  };

  const startEdit = (user: UserWithoutPassword) => {
    setEditingId(user.id);
    setEditUpload(user.uploadLimit.toString());
    setEditSearch(user.searchLimit.toString());
  };

  const handleSave = async (userId: number) => {
    setSaving(true);
    try {
      await updateUserLimits(userId, {
        uploadLimit: parseInt(editUpload),
        searchLimit: parseInt(editSearch),
      });
      toast('Limits updated', 'success');
      setEditingId(null);
      if (query.trim()) {
        const res = await searchUsers(query.trim());
        setUsers(res.data);
      }
    } catch (err: any) {
      toast(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-(--color-text) tracking-tight mb-1">Admin Panel</h1>
      <p className="text-sm text-(--color-text-muted) mb-8">Search users and manage their quotas</p>

      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search by email or name..."
            className="h-12 w-full rounded-xl border border-(--color-border-input) bg-(--color-bg-input) pl-11 pr-4 text-sm text-(--color-text) placeholder:text-(--color-text-muted)/60 focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40 focus:border-(--color-primary) transition-all"
          />
        </div>
        <Button onClick={handleSearch} disabled={searching} size="lg">
          {searching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {users.length > 0 && (
        <div className="glass-card shadow-premium rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-(--color-border)">
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">User</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Role</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Uploads</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">AI Searches</th>
                  <th className="text-left px-5 py-4 font-bold text-(--color-text-muted) text-[10px] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-(--color-border) last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-(--color-text)">{u.name}</p>
                          <p className="text-xs text-(--color-text-muted)">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'ADMIN'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm'
                          : 'bg-(--color-bg-muted) text-(--color-text-muted) border border-(--color-border)'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {editingId === u.id ? (
                        <input
                          type="number"
                          min="0"
                          value={editUpload}
                          onChange={(e) => setEditUpload(e.target.value)}
                          className="w-20 h-9 rounded-lg border border-(--color-border-input) bg-(--color-bg-input) px-2 text-sm text-(--color-text) text-center focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40"
                        />
                      ) : (
                        <span className="text-(--color-text) font-mono text-xs font-bold">{u.uploadsUsed}/{u.uploadLimit}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {editingId === u.id ? (
                        <input
                          type="number"
                          min="0"
                          value={editSearch}
                          onChange={(e) => setEditSearch(e.target.value)}
                          className="w-20 h-9 rounded-lg border border-(--color-border-input) bg-(--color-bg-input) px-2 text-sm text-(--color-text) text-center focus:outline-none focus:ring-2 focus:ring-(--color-primary)/40"
                        />
                      ) : (
                        <span className="text-(--color-text) font-mono text-xs font-bold">{u.searchesUsed}/{u.searchLimit}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {editingId === u.id ? (
                        <div className="flex gap-3">
                          <button onClick={() => handleSave(u.id)} disabled={saving} className="text-xs font-bold text-(--color-success) hover:underline cursor-pointer disabled:opacity-50">
                            {saving ? <Loader2 size={12} className="animate-spin" /> : 'Save'}
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-xs font-bold text-(--color-text-muted) hover:underline cursor-pointer">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(u)} className="text-xs font-bold text-(--color-primary) hover:underline underline-offset-4 cursor-pointer">
                          Edit Limits
                        </button>
                      )}
                    </td>
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
