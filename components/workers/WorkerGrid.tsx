import WorkerCard from './WorkerCard';

export default function WorkerGrid({ workers, isLoading }: { workers: any[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 h-64 animate-pulse flex flex-col gap-4">
            <div className="flex gap-4 items-center">
               <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
               <div className="flex flex-col gap-2 flex-grow">
                 <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                 <div className="h-3 bg-slate-200 rounded w-1/3"></div>
               </div>
            </div>
            <div className="h-3 bg-slate-200 rounded w-full mt-4"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center">
        <span className="text-6xl mb-4">🔍</span>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">No workers found</h3>
        <p className="text-slate-500">Try adjusting your filters or searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {workers.map(w => (
        <WorkerCard key={w.user_id} worker={w} />
      ))}
    </div>
  );
}
