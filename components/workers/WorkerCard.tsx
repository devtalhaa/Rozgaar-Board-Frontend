import Link from 'next/link';

export default function WorkerCard({ worker }: { worker: any }) {
  return (
    <div className="glass-card rounded-2xl shadow-sm hover:shadow-lg border border-slate-100 p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <div className="flex justify-between items-start mb-4">
           <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500 overflow-hidden">
              {worker.profile_photo ? <img src={worker.profile_photo} alt={worker.full_name} className="w-full h-full object-cover"/> : worker.full_name.charAt(0)}
           </div>
           {worker.availability === 'available' ? (
             <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Available
             </div>
           ) : (
             <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Busy
             </div>
           )}
        </div>
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          {worker.full_name}
          {worker.is_verified === 1 && (
            <span className="text-blue-500 text-sm" title="Verified Worker">✔</span>
          )}
        </h3>
        <p className="text-accent font-medium text-sm mb-3 cursor-default">
          {worker.skill_name_en} • <span className="font-urdu">{worker.skill_name_ur}</span> • {worker.city_name_en}
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
          <p className="text-xs text-slate-500">Daily</p>
          <p className="font-bold text-primary">Rs. {worker.daily_rate}</p>
        </div>
        <Link href={`/workers/${worker.user_id}`} className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          View Profile
        </Link>
      </div>
    </div>
  );
}
