'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterSidebar from './FilterSidebar';
import WorkerGrid from './WorkerGrid';

export default function WorkersPage() {
  const searchParams = useSearchParams();
  const [workers, setWorkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const initialSkill = searchParams.get('skill') || '';
  const initialSearch = searchParams.get('search') || '';

  const [activeFilters, setActiveFilters] = useState<any>({
    skill_id: initialSkill,
    search: initialSearch,
    city_id: '',
    min_rating: ''
  });

  useEffect(() => {
    fetchWorkers(activeFilters);
  }, [activeFilters]);

  const fetchWorkers = async (filters: any) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.skill_id) queryParams.append('skill_id', filters.skill_id);
      if (filters.city_id) queryParams.append('city_id', filters.city_id);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.min_rating) queryParams.append('min_rating', filters.min_rating);

      const url = `http://localhost/projectweb/rozgaar-board/backend/api/workers/get_all.php?${queryParams.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.workers) {
        setWorkers(data.workers);
      } else {
        setWorkers([]);
      }
    } catch (error) {
      console.error(error);
      setWorkers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Find Workers</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FilterSidebar onFilterChange={setActiveFilters} initialFilters={activeFilters} />
          </div>
          <div className="w-full md:w-3/4">
            <WorkerGrid workers={workers} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
