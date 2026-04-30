'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, loading, handleLogout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'employer') return '/dashboard/employer';
    return '/dashboard/worker';
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50 bg-primary/90 text-white shadow-2xl rounded-2xl border border-white/10 backdrop-blur-xl">
      <div className="px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 drop-shadow-sm">
          Rozgaar<span className="text-accent">Board</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/workers" className="hover:text-accent transition-colors font-medium">Workers</Link>
          
          <div className="flex items-center gap-3 border-l border-white/20 pl-6 h-8 min-w-[140px] justify-end">
            {loading ? (
              <div className="w-16 h-4 bg-white/20 animate-pulse rounded"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link href={getDashboardLink()} className="font-semibold px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-sm">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 bg-white/10 pl-1 pr-4 py-1 rounded-full border border-white/10">
                  <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner">
                    {user.full_name ? user.full_name.charAt(0) : 'U'}
                  </div>
                  <button onClick={handleLogout} className="text-sm font-medium hover:text-red-400 transition-colors ml-2">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="hover:text-accent transition-colors font-medium">Login</Link>
                <Link href="/register" className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-md font-semibold transition-all shadow-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
