'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function WorkerDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const meRes = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/auth/me.php', { credentials: 'include' });
      const meData = await meRes.json();
      if (meData.user) setProfile(meData.user);

      const jobsRes = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/jobs/get_my.php', { credentials: 'include' });
      const jobsData = await jobsRes.json();
      if (jobsData.jobs) setJobs(jobsData.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (jobId: number, status: string) => {
    try {
      await fetch('http://localhost/projectweb/rozgaar-board/backend/api/jobs/update_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ job_id: jobId, status })
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await fetch('http://localhost/projectweb/rozgaar-board/backend/api/workers/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          availability: profile.availability,
          daily_rate: profile.daily_rate,
          bio: profile.bio,
        })
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="p-20 text-center">Loading dashboard...</div>;
  if (!profile) return <div className="p-20 text-center">Please log in to view this page.</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Worker Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Manage Profile</h2>
            
            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Availability</label>
                <select
                  value={profile.availability || 'available'}
                  onChange={e => setProfile({...profile, availability: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm bg-white"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy / Unvailable</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Daily Rate (Rs)</label>
                <input
                  type="number"
                  value={profile.daily_rate || ''}
                  onChange={e => setProfile({...profile, daily_rate: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bio / About</label>
                <textarea
                  rows={4}
                  value={profile.bio || ''}
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-md font-bold transition-all shadow-sm">
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">Recent Works & Job Requests</h2>
            
            {jobs.length === 0 ? (
              <div className="text-center py-10 text-slate-500">
                You have no job requests yet.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {jobs.map(job => (
                  <div key={job.id} className="border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded-md uppercase ${
                          job.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                          job.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                          job.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {job.status}
                        </span>
                        <span className="text-slate-400 text-xs">{new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">{job.job_title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{job.description}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><span className="text-slate-500">Rate:</span> <span className="font-semibold text-primary">Rs. {job.offered_rate}</span></div>
                        <div><span className="text-slate-500">Days:</span> <span className="font-semibold">{job.expected_duration_days}</span></div>
                        <div><span className="text-slate-500">Start:</span> <span className="font-semibold">{job.start_date}</span></div>
                        <div><span className="text-slate-500">Location:</span> <span className="font-semibold">{job.location}</span></div>
                      </div>
                      
                      {(job.status === 'accepted' || job.status === 'in_progress' || job.status === 'completed') && (
                        <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
                          <p className="text-sm"><span className="text-slate-500">Client:</span> {job.employer_name}</p>
                          <p className="text-sm"><span className="text-slate-500">Phone:</span> {job.employer_phone}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 min-w-[140px] justify-start md:items-end">
                      {job.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusChange(job.id, 'accepted')} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors text-center">Accept Job</button>
                          <button onClick={() => handleStatusChange(job.id, 'cancelled')} className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md font-semibold text-sm transition-colors text-center">Decline</button>
                        </>
                      )}
                      
                      {job.status === 'accepted' && (
                        <button onClick={() => handleStatusChange(job.id, 'completed')} className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors text-center">Mark Completed</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
