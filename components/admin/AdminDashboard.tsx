'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [employers, setEmployers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('workers');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/admin/stats.php', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.stats) {
        setStats(data.stats);
      } else {
        setError(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      setError('Connection error');
    }
  };

  const fetchUsers = async () => {
    try {
      const workerRes = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/workers/get_all.php');
      const wData = await workerRes.json();
      if (wData.workers) setWorkers(wData.workers);

      const empRes = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/employers/get_all.php', { credentials: 'include' });
      const eData = await empRes.json();
      if (eData.employers) setEmployers(eData.employers);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleVerification = async (userId: number, role: string, currentStatus: number) => {
    try {
      await fetch('http://localhost/projectweb/rozgaar-board/backend/api/admin/verify_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ user_id: userId, role, is_verified: currentStatus === 1 ? 0 : 1 })
      });
      fetchStats();
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl shadow-sm text-center max-w-lg border border-red-100">
          <span className="text-4xl block mb-4">⛔</span>
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Control Panel</h1>
      
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-1 items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-primary">{stats.total_workers}</span>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Workers</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-1 items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-primary">{stats.total_employers}</span>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Clients</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-1 items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-accent">{stats.pending_verifications}</span>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">To Verify</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-1 items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-green-500">{stats.jobs_today}</span>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Jobs Today</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button 
            onClick={() => setActiveTab('workers')} 
            className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'workers' ? 'bg-white text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Worker Management
          </button>
          <button 
            onClick={() => setActiveTab('employers')} 
            className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'employers' ? 'bg-white text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Client Management
          </button>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-sm uppercase text-slate-500 tracking-wider bg-white">
                <th className="py-4 px-6 font-semibold">ID</th>
                <th className="py-4 px-6 font-semibold">Name</th>
                <th className="py-4 px-6 font-semibold">{activeTab === 'workers' ? 'Skill' : 'Company'}</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'workers' ? workers : employers).map(user => (
                <tr key={user.user_id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-slate-500 text-sm">#{user.user_id}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">{user.full_name}</td>
                  <td className="py-4 px-6 text-slate-600">{activeTab === 'workers' ? user.skill_name_en : user.company_name || '-'}</td>
                  <td className="py-4 px-6">
                    {user.is_verified === 1 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Verified</span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => toggleVerification(user.user_id, activeTab === 'workers' ? 'worker' : 'employer', user.is_verified)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        user.is_verified === 1 
                          ? 'bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600' 
                          : 'bg-primary hover:bg-primary-hover text-white shadow-sm'
                      }`}
                    >
                      {user.is_verified === 1 ? 'Revoke Verification' : 'Verify Securely'}
                    </button>
                  </td>
                </tr>
              ))}
              
              {(activeTab === 'workers' ? workers : employers).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No records found in this table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
