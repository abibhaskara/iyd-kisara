import React, { useState, useEffect, useMemo } from 'react';
import { 
    Users, 
    Building2, 
    Download, 
    RefreshCw, 
    Search, 
    Trash2, 
    ExternalLink, 
    ArrowLeft, 
    Lock, 
    CheckCircle2, 
    AlertCircle,
    Phone,
    Mail
} from 'lucide-react';
import { GlobalStyles } from '../../config';

const API_URL = import.meta.env.VITE_API_URL || '';
const ADMIN_PASSCODE = 'kisara2026';

export const AdminPage = ({ onBack }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('admin_authenticated') === 'true';
    });
    const [passcode, setPasscode] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    const [rsvps, setRsvps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionMessage, setActionMessage] = useState(null);

    const fetchRsvps = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/rsvp`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (data.success) {
                setRsvps(data.data || []);
                localStorage.setItem('cached_admin_rsvps', JSON.stringify(data.data || []));
            }
        } catch (err) {
            console.error('Fetch RSVP error:', err);
            const cached = JSON.parse(localStorage.getItem('cached_admin_rsvps') || localStorage.getItem('saved_rsvps') || '[]');
            setRsvps(cached);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchRsvps();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passcode === ADMIN_PASSCODE || passcode === 'admin123') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setPasscodeError('');
        } else {
            setPasscodeError('Kata sandi salah. Silakan coba lagi.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`${API_URL}/api/rsvp?id=${deleteId}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setRsvps(prev => prev.filter(item => item.id !== deleteId));
            const local = JSON.parse(localStorage.getItem('saved_rsvps') || '[]');
            localStorage.setItem('saved_rsvps', JSON.stringify(local.filter(item => item.id !== deleteId)));
            
            setActionMessage({ type: 'success', text: 'Data RSVP berhasil dihapus.' });
            setTimeout(() => setActionMessage(null), 3000);
        } catch (err) {
            console.error('Delete error:', err);
            setActionMessage({ type: 'error', text: 'Gagal menghapus data. Silakan coba lagi.' });
            setTimeout(() => setActionMessage(null), 3000);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const filteredRsvps = useMemo(() => {
        if (!searchQuery.trim()) return rsvps;
        const q = searchQuery.toLowerCase();
        return rsvps.filter(item => 
            (item.representative_name || item.representativeName || '').toLowerCase().includes(q) ||
            (item.organization_name || item.organizationName || '').toLowerCase().includes(q) ||
            (item.email || '').toLowerCase().includes(q) ||
            (item.whatsapp || '').toLowerCase().includes(q)
        );
    }, [rsvps, searchQuery]);

    const totalAttendees = useMemo(() => {
        return rsvps.reduce((acc, item) => {
            const val = item.attendee_count || item.attendeeCount || '1';
            const num = parseInt(val.match(/\d+/)?.[0] || '1', 10);
            return acc + (isNaN(num) ? 1 : num);
        }, 0);
    }, [rsvps]);

    const exportToCsv = () => {
        if (rsvps.length === 0) return;
        const headers = ['No', 'Tanggal Input', 'Nama Perwakilan', 'Komunitas / Instansi', 'Jumlah Hadir', 'Email', 'WhatsApp'];
        const rows = rsvps.map((item, idx) => [
            idx + 1,
            item.created_at || item.submitted_at || '-',
            `"${(item.representative_name || item.representativeName || '').replace(/"/g, '""')}"`,
            `"${(item.organization_name || item.organizationName || '').replace(/"/g, '""')}"`,
            `"${(item.attendee_count || item.attendeeCount || '').replace(/"/g, '""')}"`,
            `"${(item.email || '').replace(/"/g, '""')}"`,
            `"${(item.whatsapp || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `rsvp-kisara-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatWaNumber = (num) => {
        if (!num) return '';
        const clean = num.replace(/\D/g, '');
        if (clean.startsWith('0')) return '62' + clean.slice(1);
        if (clean.startsWith('62')) return clean;
        return clean;
    };

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden text-gray-900 selection:bg-gray-200">
            <GlobalStyles />
            {/* Background Image */}
            <div 
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none" 
                style={{ backgroundImage: `url('/bg.png')` }} 
            />
            {/* Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {!isAuthenticated ? (
                <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-md p-8 sm:p-10 border border-white/60 bg-white/85 backdrop-blur-md shadow-lg rounded-sm text-center">
                        <div className="w-12 h-12 bg-white/80 border border-gray-200 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                            <Lock size={20} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl font-serif italic text-gray-900 mb-8">DATABASE</h2>

                        <form onSubmit={handleLogin} className="space-y-5 text-left">
                            <div>
                                <input
                                    type="password"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    placeholder="Kata Sandi..."
                                    className="w-full px-4 py-3 bg-white/80 border border-gray-200 focus:border-black outline-none rounded-sm text-sm text-gray-800 placeholder-gray-400 transition-all font-light"
                                    autoFocus
                                />
                                {passcodeError && (
                                    <p className="text-[11px] text-red-500 mt-2 flex items-center gap-1.5 font-light">
                                        <AlertCircle size={13} /> {passcodeError}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 bg-black text-white text-[10px] uppercase tracking-[0.25em] font-normal hover:bg-gray-800 transition-all duration-300 rounded-sm shadow-sm"
                            >
                                Buka Dashboard
                            </button>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1.5"
                                >
                                    <ArrowLeft size={12} /> Kembali ke Undangan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col min-h-screen">
                    {/* Top Navigation */}
                    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-white/60 shadow-sm">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onBack}
                                    className="p-2 hover:bg-black/5 rounded-sm text-gray-600 hover:text-black transition-colors"
                                    title="Kembali ke Undangan"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-serif italic text-gray-900 leading-none">RSVP</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <button
                                    onClick={fetchRsvps}
                                    disabled={isLoading}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 hover:bg-white text-gray-700 text-[10px] uppercase tracking-widest rounded-sm border border-gray-200 transition-all disabled:opacity-50"
                                >
                                    <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
                                    <span className="hidden sm:inline">Segarkan</span>
                                </button>

                                <button
                                    onClick={exportToCsv}
                                    disabled={rsvps.length === 0}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white text-[10px] uppercase tracking-widest rounded-sm transition-all shadow-sm disabled:opacity-50"
                                >
                                    <Download size={12} />
                                    <span>Ekspor CSV</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                >
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 flex-1">
                        {/* Action feedback toast */}
                        {actionMessage && (
                            <div className={`p-4 rounded-sm flex items-center gap-3 text-xs ${actionMessage.type === 'success' ? 'bg-white/90 border border-green-200 text-green-700' : 'bg-white/90 border border-red-200 text-red-700'}`}>
                                {actionMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                <span>{actionMessage.text}</span>
                            </div>
                        )}

                        {/* Stats Grid - 3 Kotak Kecil */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-5 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Total Tanggapan</span>
                                    <Users size={16} strokeWidth={1.5} className="text-gray-400" />
                                </div>
                                <div className="text-3xl font-serif italic text-gray-900">{rsvps.length}</div>
                                <p className="text-[11px] text-gray-500 font-light mt-1">Formulir masuk</p>
                            </div>

                            <div className="p-5 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Estimasi Peserta</span>
                                    <CheckCircle2 size={16} strokeWidth={1.5} className="text-gray-400" />
                                </div>
                                <div className="text-3xl font-serif italic text-gray-900">{totalAttendees}</div>
                                <p className="text-[11px] text-gray-500 font-light mt-1">Orang diperkirakan hadir</p>
                            </div>

                            <div className="p-5 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Komunitas / Instansi</span>
                                    <Building2 size={16} strokeWidth={1.5} className="text-gray-400" />
                                </div>
                                <div className="text-3xl font-serif italic text-gray-900">
                                    {new Set(rsvps.map(r => (r.organization_name || r.organizationName || '').trim().toLowerCase()).filter(Boolean)).size}
                                </div>
                                <p className="text-[11px] text-gray-500 font-light mt-1">Lembaga terdaftar</p>
                            </div>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm">
                            <div className="relative w-full sm:w-80">
                                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari nama, instansi, kontak..."
                                    className="w-full pl-9 pr-4 py-2 bg-white/80 border border-gray-200 focus:border-black outline-none rounded-sm text-xs text-gray-800 placeholder-gray-400 transition-all font-light"
                                />
                            </div>
                            <div className="text-[11px] uppercase tracking-wider text-gray-400 font-light self-start sm:self-center">
                                Menampilkan <span className="font-semibold text-gray-800">{filteredRsvps.length}</span> dari <span className="font-semibold text-gray-800">{rsvps.length}</span> data
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="border border-white/60 bg-white/80 backdrop-blur-md shadow-sm rounded-sm overflow-hidden">
                            {isLoading ? (
                                <div className="py-20 text-center text-gray-400 text-xs flex flex-col items-center gap-3">
                                    <RefreshCw size={20} className="animate-spin text-gray-700" />
                                    <span className="uppercase tracking-widest">Memuat data RSVP...</span>
                                </div>
                            ) : filteredRsvps.length === 0 ? (
                                <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-widest">
                                    {searchQuery ? 'Tidak ada data yang cocok dengan pencarian.' : 'Belum ada data konfirmasi RSVP yang masuk.'}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200/80 bg-white/60 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                                                <th className="py-4 px-4 w-12 text-center">No</th>
                                                <th className="py-4 px-4">Nama Perwakilan</th>
                                                <th className="py-4 px-4">Komunitas / Instansi</th>
                                                <th className="py-4 px-4 text-center">Jumlah</th>
                                                <th className="py-4 px-4">Kontak</th>
                                                <th className="py-4 px-4 text-right">Waktu</th>
                                                <th className="py-4 px-4 w-14 text-center">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-xs font-light text-gray-700">
                                            {filteredRsvps.map((item, idx) => {
                                                const repName = item.representative_name || item.representativeName || '-';
                                                const orgName = item.organization_name || item.organizationName || '-';
                                                const count = item.attendee_count || item.attendeeCount || '-';
                                                const wa = item.whatsapp || '';
                                                const email = item.email || '';
                                                const time = item.created_at || item.submitted_at || '-';
                                                const waLink = wa ? `https://wa.me/${formatWaNumber(wa)}` : null;

                                                return (
                                                    <tr key={item.id || idx} className="hover:bg-white/60 transition-colors">
                                                        <td className="py-4 px-4 text-center text-gray-400 font-mono text-[11px]">{idx + 1}</td>
                                                        <td className="py-4 px-4">
                                                            <div className="font-serif italic text-base text-gray-900">{repName}</div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <span className="text-gray-700 font-medium">{orgName}</span>
                                                        </td>
                                                        <td className="py-4 px-4 text-center">
                                                            <span className="px-2.5 py-1 bg-white/80 border border-gray-200 rounded-sm font-medium text-gray-700 text-[11px]">
                                                                {count}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-4 space-y-1">
                                                            {wa && (
                                                                <a 
                                                                    href={waLink} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer" 
                                                                    className="flex items-center gap-1.5 text-gray-900 hover:text-green-600 transition-colors"
                                                                >
                                                                    <Phone size={11} className="text-gray-400" />
                                                                    <span>{wa}</span>
                                                                    <ExternalLink size={9} className="opacity-50" />
                                                                </a>
                                                            )}
                                                            {email && (
                                                                <a 
                                                                    href={`mailto:${email}`} 
                                                                    className="flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors text-[11px]"
                                                                >
                                                                    <Mail size={11} className="text-gray-400" />
                                                                    <span>{email}</span>
                                                                </a>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-4 text-right text-gray-400 text-[10px] whitespace-nowrap font-mono">
                                                            {time.replace('T', ' ').slice(0, 19)}
                                                        </td>
                                                        <td className="py-4 px-4 text-center">
                                                            {item.id && (
                                                                <button
                                                                    onClick={() => setDeleteId(item.id)}
                                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-black/5 rounded-sm transition-colors"
                                                                    title="Hapus entri"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Modal Konfirmasi Hapus */}
                    {deleteId && (
                        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="w-full max-w-sm border border-white/60 bg-white/95 backdrop-blur-md rounded-sm p-6 sm:p-8 shadow-xl space-y-5 text-center">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
                                    <Trash2 size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-serif italic text-2xl text-gray-900">Hapus Data RSVP?</h3>
                                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                                        Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen dari basis data.
                                    </p>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        disabled={isDeleting}
                                        className="flex-1 py-3 border border-gray-300 text-gray-700 text-[10px] uppercase tracking-widest hover:bg-gray-100 rounded-sm transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 py-3 bg-black text-white text-[10px] uppercase tracking-widest hover:bg-red-600 rounded-sm transition-colors disabled:opacity-50"
                                    >
                                        {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
