'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function WorkerProfile({ workerId }: { workerId: string }) {
  const { user } = useAuth();
  const [worker, setWorker] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHiring, setIsHiring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobForm, setJobForm] = useState({
    job_title: '',
    description: '',
    location: '',
    start_date: '',
    expected_duration_days: '1',
    offered_rate: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const workerRes = await fetch(`http://localhost/projectweb/rozgaar-board/backend/api/workers/get_single.php?id=${workerId}`);
        const workerData = await workerRes.json();
        
        if (workerData.worker) {
          setWorker(workerData.worker);
        }

        const reviewsRes = await fetch(`http://localhost/projectweb/rozgaar-board/backend/api/reviews/get_by_worker.php?worker_id=${workerId}`);
        const reviewsData = await reviewsRes.json();
        
        if (reviewsData.reviews) {
          setReviews(reviewsData.reviews);
        }
      } catch (error) {
        console.error("Error fetching worker profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [workerId]);

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost/projectweb/rozgaar-board/backend/api/jobs/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          worker_id: workerId,
          ...jobForm
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Job request sent successfully!');
        setIsHiring(false);
      } else {
        toast.error(data.error || 'Failed to send request. Make sure you are logged in as a Client.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <span className="text-6xl mb-4">😕</span>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Worker Not Found</h1>
        <p className="text-slate-600 mb-8">The worker profile you are looking for does not exist or has been removed.</p>
        <Link href="/workers" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-semibold transition-colors">
          Browse All Workers
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center sticky top-24">
              <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-4xl font-bold text-slate-500 overflow-hidden mb-6 shadow-inner">
                 {worker.profile_photo ? <img src={worker.profile_photo} alt={worker.full_name} className="w-full h-full object-cover"/> : worker.full_name.charAt(0)}
              </div>
              
              <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center justify-center gap-2">
                {worker.full_name}
                {worker.is_verified === 1 && (
                  <span className="text-blue-500" title="Verified Worker">✔</span>
                )}
              </h1>
              
              <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 inline-block">
                {worker.skill_name_en} • <span className="font-urdu">{worker.skill_name_ur}</span>
              </div>
              
              <div className="w-full border-t border-slate-100 my-4"></div>
              
              <div className="w-full flex justify-between items-center mb-3">
                <span className="text-slate-500">Daily Rate</span>
                <span className="font-bold text-lg text-slate-800">Rs. {worker.daily_rate}</span>
              </div>
              
              <div className="w-full flex justify-between items-center mb-3">
                <span className="text-slate-500">Location</span>
                <span className="font-semibold text-slate-800">{worker.city_name_en}</span>
              </div>
              
              <div className="w-full flex justify-between items-center mb-6">
                <span className="text-slate-500">Availability</span>
                {worker.availability === 'available' ? (
                  <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm">Available Today</span>
                ) : (
                  <span className="text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm">Busy</span>
                )}
              </div>
              
              {!user ? (
                <div className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-bold text-center border border-slate-200">
                  Log in to Hire Worker
                </div>
              ) : user.role === 'employer' ? (
                <button onClick={() => setIsHiring(!isHiring)} className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg">
                  {isHiring ? 'Cancel Request' : 'Hire Now'}
                </button>
              ) : (
                <div className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-bold text-sm text-center border border-slate-200">
                  Only Clients can send Job Requests
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-8">
            {isHiring && (
              <div className="bg-white rounded-2xl shadow-sm border border-primary/20 p-8 animate-in fade-in slide-in-from-top-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Request Job Completion</h2>
                <form onSubmit={handleHireSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                      <input required type="text" value={jobForm.job_title} onChange={e => setJobForm({...jobForm, job_title: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md" placeholder="e.g. Fix bathroom pipe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                      <input required type="date" value={jobForm.start_date} onChange={e => setJobForm({...jobForm, start_date: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Location / Address</label>
                    <input required type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md" placeholder="e.g. House 12, Street 4, Lahore" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Days)</label>
                      <input required type="number" min="1" value={jobForm.expected_duration_days} onChange={e => setJobForm({...jobForm, expected_duration_days: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Offered Rate (Rs per day)</label>
                      <input required type="number" value={jobForm.offered_rate} onChange={e => setJobForm({...jobForm, offered_rate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md" placeholder={`Suggest >= ${worker.daily_rate}`} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
                    <textarea required rows={3} value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md" placeholder="Describe what needs to be done..."></textarea>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-bold transition-all disabled:opacity-70 mt-4 shadow-sm">
                    {isSubmitting ? 'Sending Request...' : 'Send Job Request Confirm'}
                  </button>
                </form>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">About Me</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {worker.bio || "This professional hasn't provided a bio yet, but their work speaks for itself!"}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-slate-800">Reviews & Ratings</h2>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="text-2xl font-bold text-slate-800">{worker.average_rating}</span>
                  <span className="text-slate-500 ml-1">({worker.total_jobs_done} jobs)</span>
                </div>
              </div>
              
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <span className="text-4xl block mb-3">⭐</span>
                  No reviews yet. Be the first to hire and review!
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-slate-100 rounded-xl p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-slate-800">{review.employer_name}</h4>
                          <div className="flex text-yellow-400 text-sm mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < review.rating ? '' : 'text-slate-200'}>★</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium bg-white px-3 py-1 border rounded-md">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-slate-600 mt-3 italic">"{review.comment}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
