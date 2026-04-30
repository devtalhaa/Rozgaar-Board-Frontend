'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FeaturedWorkers() {
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost/projectweb/rozgaar-board/backend/api/workers/get_all.php?limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.workers) {
          setWorkers(data.workers);
        }
      })
      .catch(console.error);
  }, []);

  if (workers.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Top Rated Workers</h2>
            <p className="text-slate-600">Hire the best professionals reviewed by verified clients.</p>
          </div>
          <Link href="/workers" className="text-accent font-semibold hover:underline hidden md:block">
            View All Workers
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {workers.map((worker: any) => (
            <div key={worker.user_id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                   <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500 overflow-hidden">
                      {worker.profile_photo ? <img src={worker.profile_photo} alt={worker.full_name} className="w-full h-full object-cover"/> : worker.full_name.charAt(0)}
                   </div>
                   <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Available
                   </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{worker.full_name}</h3>
                <p className="text-accent font-medium text-sm mb-3 cursor-default">
                  {worker.skill_name_en} • <span className="font-urdu">{worker.skill_name_ur}</span>
                </p>
                <div className="flex items-center gap-2 mb-4">
                   <span className="text-yellow-400">★</span>
                   <span className="font-bold text-slate-700">{worker.average_rating}</span>
                   <span className="text-slate-500 text-sm">({worker.total_jobs_done} jobs)</span>
                </div>
                <p className="text-slate-600 text-sm line-clamp-2 min-h-[40px] mb-6">
                  {worker.bio || "No professional bio provided yet."}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500">Daily Rate</p>
                  <p className="font-bold text-primary">Rs. {worker.daily_rate}</p>
                </div>
                <Link href={`/workers/${worker.user_id}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/workers" className="text-accent font-semibold hover:underline">
            View All Workers
          </Link>
        </div>
      </div>
    </section>
  );
}
